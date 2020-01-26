import xs, { MemoryStream, Stream } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import run, { MatchingMain, MatchingDrivers } from '@cycle/run';

type DOMSources = {
  dom: Stream<Event>
};

type AStream = MemoryStream<string> & MemoryStream<number>;

type SinkOfStreams = {
  [index: string]: AStream
};

type Effects = {
  [index: string]: (text$: AStream) => void;
};

function main(sources: DOMSources) {
  const click$ = sources.dom;

  return {
    dom: click$
      .startWith(new Event('click'))
      .map(
        () => xs.periodic(1000)
          .fold((prev: number) => prev + 1, 0)
      )
      .flatten()
      .map((i: number) => `Click anywhere to reset it: ${i}`) as AStream,

    log: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0) as AStream
  };
}

function domDriver(text$: MemoryStream<string>): Stream<Event> {
  const listner = {
    next: (str: string) => {
      const el = document.querySelector('div.ch_06');

      if (el) {
        el.textContent = str;
      }
    }
  };

  text$.subscribe(listner);

  return fromEvent(document, 'click');
}

function logDriver(number$: MemoryStream<number>): void {
  number$.subscribe({
    next: console.log
  });
}

const effects: Effects = {
  dom: domDriver,
  log: logDriver
};

/**
 *
 * Cycle.js run function
 * @param main
 * @param effects
 */
/**
  function run(
    main: (domSources: DOMSources) => SinkOfStreams,
    effects: Effects
  ): void {
  const { fakeSinks, sources } = Object.keys(effects)
    .reduce((acc, key) => {
      const fakeSink = xs.create() as AStream;

      return {
        fakeSinks: {
          ...acc.fakeSinks,
          [key]: fakeSink
        },
        sources: {
          ...acc.sources,
          [key]: effects[key](fakeSink)
        }
      };
    }, {
      fakeSinks: {} as SinkOfStreams,
      sources: {}
    });

  const sinks = main(sources as DOMSources);

  Object.keys(sinks)
    .forEach((key) => fakeSinks[key].imitate(sinks[key]));
  }
*/

run(
  main as MatchingMain<Effects, (sources: DOMSources) => SinkOfStreams>,
  effects as MatchingDrivers<Effects, MatchingMain<Effects, (sources: DOMSources) => SinkOfStreams>>
);
