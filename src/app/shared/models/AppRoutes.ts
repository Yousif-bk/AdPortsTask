export const AppRoutes = {
  Auth: {
    full: "auth",
    main: "auth",
    sub: "",
    login: {
       full: "login",
       main: "login",
       sub: ""
    }
 },

 products: {
  full: "/products",
  main: "products",
  sub: "",
  details: {
     full: "products/",
     main: ":id",
  },
  new: {
     full: "product/new",
     main: "new",
     sub: ""
  },
  edit: {
    full: "clients/edit/",
    main: "edit/:id",
    sub: ":id"
 }
},
}
