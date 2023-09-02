// https://docs.elgato.com/sdk/plugins/layouts-sd+

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
 * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#bar}
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
  /** An integer value to represent shape. */
  subtype?: BarSubtype;
}

/**
 * Bar shape with a triangle indicator below.
 *
 * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#gbar}
 */
export interface GbarItem
  extends ItemBase<"gbar">,
    Pick<BarItem, "bar_bg_c" | "bar_border_c" | "border_w" | "subtype"> {
  /**
   * An integer value for the indicator's groove height.
   * The indicator height will be adjusted to fit in the items height.
   * Defaulted to 10.
   */
  bar_h?: number;
}

/**
 * Used to display an image. The image is scaled with respect to `rect`.
 *
 * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#pixmap}
 */
export interface PixmapItem extends ItemBase<"pixmap"> {}

export interface Font {
  /**
   * An integer font pixel size.
   *
   * Note that if the key for the text item is title the styles selected in the property inspector
   * will override this property.
   */
  size?: string;
  /**
   * Weight of the font
   * (an integer value between 100 and 1000 or the string with a name of typographical weight).
   *
   * Note that if the key for the text item is title the styles selected in the property inspector
   * will override this property.
   */
  weight?: string;
}

/**
 * A text label.
 *
 * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#text}
 */
export interface TextItem extends ItemBase<"text"> {
  /**
   * A string describing the text alignment in the rectangle.
   * Defaulted to center.
   *
   * Note that if the key for the text item is title the styles selected in the property inspector
   * will override this proper.
   */
  alignment?: "center" | "left" | "right";
  /**
   * A string describing the color of text.
   * Defaulted to white.
   *
   * Note that if the key for the text item is title the styles selected in the property inspector
   * will override this property.
   */
  color?: string;
  /** An object describing the text. */
  font?: Font;
}

export type Item = BarItem | GbarItem | PixmapItem | TextItem;

/**
 * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#built-in-layouts}
 */
export enum BuiltInLayout {
  /**
   * The default layout.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#icon-layout-x1}
   */
  Icon = "$X1",
  /**
   * The layout best suited for custom images with a title.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#canvas-layout-a0}
   */
  Canvas = "$A0",
  /**
   * The layout best suited for representing a single value.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#value-layout-a1}
   */
  Value = "$A1",
  /**
   * The layout best suited for representing a single value range.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#indicator-layout-b1}
   */
  Indicator = "$B1",
  /**
   * The layout best suited for representing a single value range, where the data can be further
   * explained using color.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#gradient-indicator-layout-b2}
   */
  GradientIndicator = "$B2",
  /**
   * The layout best suited for representing two value ranges.
   *
   * {@link https://docs.elgato.com/sdk/plugins/layouts-sd+#double-indicator-layout-c1}
   */
  DoubleIndicator = "$C1",
}

export interface Layout {
  /**
   * The layout name must be unique,
   * i.e. not to collide with built-in layouts or ones defined by other plug-ins.
   */
  id: string;
  /** Array of item objects. */
  items: Item[];
}
