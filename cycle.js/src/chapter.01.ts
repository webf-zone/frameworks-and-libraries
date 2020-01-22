import { Stream as xs } from '../node_modules/xstream/dist/xstream';

// Logic
xs.periodic(1000)
  .fold((prev: number) => prev + 1, 0)
  .map((i: number) => `Seconds elapsed: ${i}`)

  // Effects
  .subscribe({
    next: (str: string) => {
      const el = document.querySelector('div.ch_01');
      el.textContent = str;
    }
  });
