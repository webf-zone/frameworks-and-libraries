import xs, { MemoryStream, Stream } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

type DOMSources = {
  dom: Stream<Event>
};

function main(sources: DOMSources): SinkOfStreams {
  const click$ = sources.dom;

  return {
    dom: click$
      .startWith(new Event('click'))
      .map(
        () => xs.periodic(1000)
          .fold((prev: number) => prev + 1, 0)
      )
      .flatten()
      .map((i: number) => `Click anywhere to reset it: ${i}`),

    log: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0)
  };
}

function domDriver(text$: MemoryStream<string>): Stream<Event> {
  const listner = {
    next: (str: string) => {
      const el = document.querySelector('div.ch_05');

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

type SinkOfStreams = {
  dom: MemoryStream<string>;
  log: MemoryStream<number>;
};

type Effects = {
  [index: string]: (text$: MemoryStream<string> & MemoryStream<number>) => void;
};

const effects: Effects = {
  dom: domDriver,
  log: logDriver
};

function run(
  logicFn: (domSources: DOMSources) => SinkOfStreams,
  effects: Effects
): void {
  const fakeDOMSink = xs.create() as MemoryStream<string>;
  const domSource = domDriver(fakeDOMSink);
  const sinks = logicFn({ dom: domSource });

  fakeDOMSink.imitate(sinks.dom);
}

run(main, effects);
