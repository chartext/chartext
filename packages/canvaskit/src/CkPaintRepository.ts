import { Paint, PaintStyle } from 'canvaskit-wasm';
import { CkGraphics } from '@/CkGraphics';

export type CkPaintSet = {
  fill: Paint;
  stroke: Paint;
};

export class CkPaintRepository {
  readonly #paintSetMap: Map<string, CkPaintSet> = new Map<
    string,
    CkPaintSet
  >();
  readonly #defaultPaintSet: CkPaintSet;
  readonly #ckGraphics: CkGraphics;
  readonly #fillPaintStyle: PaintStyle;
  readonly #strokePaintStyle: PaintStyle;

  constructor(ckGraphics: CkGraphics, colors: string[]) {
    const {
      CK: {
        PaintStyle: { Fill, Stroke },
      },
    } = ckGraphics;

    this.#fillPaintStyle = Fill;
    this.#strokePaintStyle = Stroke;
    this.#ckGraphics = ckGraphics;

    const blackFillPaint = ckGraphics.createPaint({
      color: '#000',
      style: Fill,
    });
    const blackStrokePaint = ckGraphics.createPaint({
      color: '#000',
      style: Stroke,
    });

    this.#defaultPaintSet = {
      fill: blackFillPaint,
      stroke: blackStrokePaint,
    };

    colors.forEach((color) => {
      if (!this.#paintSetMap.has(color)) {
        const fillPaint = ckGraphics.createPaint({ color, style: Fill });
        const strokePaint = ckGraphics.createPaint({ color, style: Stroke });

        this.#paintSetMap.set(color, { fill: fillPaint, stroke: strokePaint });
      }
    });
  }

  addColor(color: string) {
    if (!this.#paintSetMap.has(color)) {
      const fillPaint = this.#ckGraphics.createPaint({
        color,
        style: this.#fillPaintStyle,
      });
      const strokePaint = this.#ckGraphics.createPaint({
        color,
        style: this.#strokePaintStyle,
      });

      this.#paintSetMap.set(color, { fill: fillPaint, stroke: strokePaint });
    }
  }

  removeColor(color: string) {
    if (this.#paintSetMap.has(color)) {
      const paintSet = this.#paintSetMap.get(color);

      if (paintSet) {
        CkGraphics.delete(paintSet.fill, paintSet.stroke);
      }
    }
  }

  getPaintSet(color: string): CkPaintSet {
    return this.#paintSetMap.get(color) ?? this.#defaultPaintSet;
  }

  delete() {
    CkGraphics.delete(this.#defaultPaintSet.fill, this.#defaultPaintSet.stroke);
    this.#paintSetMap.forEach((paintSet) =>
      CkGraphics.delete(paintSet.fill, paintSet.stroke),
    );
  }
}
