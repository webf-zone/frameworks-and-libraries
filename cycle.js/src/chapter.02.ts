import xs, { MemoryStream } from 'xstream';

function main() {
  return xs.periodic(1000)
    .fold((prev: number) => prev + 1, 0)
    .map((i: number) => `Seconds elapsed: ${i}`);
}

function domDriver(text$: MemoryStream<string>): void {
  const listner = {
    next: (str: string) => {
      const el = document.querySelector('div.ch_02');

      if (el) {
        el.textContent = str;
      }
    }
  };

  text$.subscribe(listner);
}

const sink = main();

domDriver(sink);
