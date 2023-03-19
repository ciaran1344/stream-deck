// https://developer.elgato.com/documentation/stream-deck/sdk/layouts

export interface ItemBase<T extends string> {
  /**
   * The name of the defined item.
   * `setFeedback` uses it as a key to identify the item of the layout (this has to be unique).
   */
  key: string;
  /**
   * The array holding the rectangle coordinates (x, y, w, h) of the defined item.
   * Items with the same `zOrder` must NOT overlap.
   * The rectangle must be inside of slot coordinates - (0, 0) x (200, 100).
   */
  rect: [x: number, y: number, w: number, h: number];
  type: T;
  /** A string used to provide an image path or image itself as a base64 encoded data. */
  value: string;

  /** The string used to define the item background fill color. Defaulted to transparent. */
  background?: string;
  /**
   * A boolean value which is true when the defined item is enabled (i.e. visible).
   * Defaulted to `true`.
   */
  enabled?: boolean;
  /**
   * A real number in a range [0.0, 1.0] determining the opacity level of the item.
   * Defaulted to 1.
   */
  opacity?: number;
  /**
   * The non-negative integer in a range [0, 700) defining the z-order of the item.
   * Items with the same zOrder must NOT overlap.
   * Defaulted to zero.
   */
  zOrder?: number;
}

export enum BarSubtype {
  Rectangle,
  DoubleRectangle,
  Trapezoid,
  DoubleTrapezoid,
  Groove,
}

/**
 * Bar shape filled with the specified color.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/layouts/#bar}
 */
export interface BarItem extends ItemBase<"bar"> {
  /** A string value to determine bar color or gradient. Defaulted to `darkGray`. */
  bar_bg_c?: string;
  /** A string value for bar border color. Defaulted to `white`. */
  bar_border_c?: string;
  /** A string value for bar indicator fill color. Defaulted to `white`. */
  bar_fill_c?: string;
  /** An integer value for border width. Defaulted to 2. */
  border_w?: number;
  /**
   * An integer value to represent shape:
   * 0 - rectangle, 1 - double rectangle, 2 - trapezoid, 3 - double trapezoid, 4 - groove
   * (groove is recommended design for SD+)
   */
  subtype?: BarSubtype;
}

/**
 * Bar shape with a triangle indicator below.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/layouts/#gbar}
 */
export interface GbarItem extends ItemBase<"gbar"> {
  // TODO
}

/**
 * Used to display an image. The image is scaled with respect to `rect`.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/layouts/#pixmap}
 */
export interface PixmapItem extends ItemBase<"pixmap"> {}

/**
 * A text label.
 *
 * {@link https://developer.elgato.com/documentation/stream-deck/sdk/layouts/#text}
 */
export interface TextItem extends ItemBase<"text"> {
  // TODO
}

export type Item = BarItem | GbarItem | PixmapItem | TextItem;

export interface Layout {
  /**
   * The layout name must be unique,
   * i.e. not to collide with built-in layouts or ones defined by other plug-ins.
   */
  id: string;
  /** Array of item objects. */
  items: Item[];
}
