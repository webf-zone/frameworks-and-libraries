import xs, { MemoryStream, Stream, Listener } from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import run, { MatchingMain, MatchingDrivers } from '@cycle/run';

type Sources = {
  [index: string]: Stream<Event>
};

type AStream = MemoryStream<object> & MemoryStream<number>;

type SinkOfStreams = {
  [index: string]: AStream
};

type Effects = {
  [index: string]: (objOrNum$: AStream) => void;
};

type Elmt = {
  tag: string;
  children: string[] | Elmt[];
};

function main(sources: Sources) {
  const click$ = sources.dom;

  return {
    dom: click$
      .startWith(new Event('click'))
      .map(
        () => xs.periodic(1000)
          .fold((prev: number) => prev + 1, 0)
      )
      .flatten()
      .map((i: number) => ({
        tag: 'DIV',
        children: [
          `Click anywhere to reset it: ${i}`
        ]
      })) as Stream<Elmt>,

    log: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0) as AStream
  };
}

function domDriver(obj$: MemoryStream<object>): Stream<Event> {
  function createElement(e: Elmt): Element {
    const ele = document.createElement(e.tag);

    e.children.forEach((child: any) => {  // TODO: fix `any`
      if (child.tag) {
        ele.appendChild(createElement(child));
      } else {
        ele.textContent = child;
      }
    });

    return ele;
  }

  const listner = {
    next: (obj: Elmt) => {
      const el = document.querySelector('div.ch_07');
      const newEl = createElement(obj);

      if (el) {
        el.textContent = '';
        el.appendChild(newEl);
      }
    }
  };

  obj$.subscribe(listner as Partial<Listener<object>>); // TODO: seems hacky

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

run(
  main as MatchingMain<Effects,
    (sources: Sources) => SinkOfStreams>,
  effects as MatchingDrivers<Effects, MatchingMain<Effects,
    (sources: Sources) => SinkOfStreams>>
);
