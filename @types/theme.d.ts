// @types/theme.d.ts
import { Theme } from "@react-navigation/native";

declare module "@react-navigation/native" {
  interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      secondary:string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      regular?: {
        fontWeight: string;
        fontSize: number;
      };
    };
    fonts: {
      regular: FontStyle;
      medium: FontStyle;
      bold: FontStyle;
      heavy: FontStyle;
    };
  }

  interface FontStyle {
    fontWeight: string;
    fontSize: number;
  }
}
