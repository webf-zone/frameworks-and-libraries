import xs, { MemoryStream } from 'xstream';

function main(): SinkOfStreams {
  return {
    dom: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0)
      .map((i: number) => `Seconds elapsed: ${i}`),
    log: xs.periodic(1000)
      .fold((prev: number) => prev + 1, 0)
  };
}

function domDriver(text$: MemoryStream<string>): void {
  const listner = {
    next: (str: string) => {
      const el = document.querySelector('div.ch_04');

      if (el) {
        el.textContent = str;
      }
    }
  };

  text$.subscribe(listner);
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
const sinks: SinkOfStreams = main();

type Effects = {
  [index: string]: (text$: MemoryStream<string> & MemoryStream<number>) => void;
};
const effects: Effects = {
  dom: domDriver,
  log: logDriver
};

function run(sinks: SinkOfStreams, effects: Effects): void {
  type EffectName = 'dom' & 'log';

  Object.keys(effects)
    .forEach((effect: string) => {
      if (sinks[effect as EffectName]) {
        effects[effect](sinks[effect as EffectName]);
      }
    });
}

run(sinks, effects);
