import { Routes } from "@angular/router";
import { AppRoutes } from "../models/AppRoutes";

export const content: Routes = [
  {
     path: AppRoutes.products.main,
     loadChildren: () => import("../../../app/components/products/products.module").then((m) => m.ProductModule),
  },
];
