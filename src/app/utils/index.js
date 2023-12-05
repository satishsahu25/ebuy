import { getStorage } from "firebase/storage";

export const navOptions = [
    {
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      id: "listing",
      label: "All Products",
      path: "/product/listing/allproducts",
    },
    {
      id: "listingMen",
      label: "Men",
      path: "/product/listing/men",
    },
    {
      id: "listingWomen",
      label: "Women",
      path: "/product/listing/women",
    },
    {
      id: "listingKids",
      label: "kids",
      path: "/product/listing/kids",
    },
  ];

  export const adminNavOptions = [
    {
      id: "adminListing",
      label: "Manage All Products",
      path: "/admin-view/all-products",
    },
    {
      id: "adminNewProduct",
      label: "Add New Product",
      path: "/admin-view/add-product",
    },
  ];

  export const registrationFormCOntrols=[
    {
      id:"name",
      type:'text',
      placeholder:"Enter your name",
      label:"Name",
      componenttype:'input',
    },{
      id:"email",
      type:'email',
      placeholder:"Enter your email",
      label:"Email",
      componenttype:'input',
    },{
      id:"password",
      type:'password',
      placeholder:"Enter your password",
      label:"Password",
      componenttype:'input',
    },{
      id:"role",
      type:'',
      placeholder:"",
      label:"Role",
      componenttype:'select',
      options:[
        {
          id:'admin',
          label:'Admin'
        },{
          id:'customer',
          label:'Customer'
        }
      ]
    },

  ]

  export const loginFormcontrols=[
    {
      id:"email",
      type:'email',
      placeholder:"Enter your email",
      label:"Email",
      componenttype:'input',
    },{
      id:"password",
      type:'password',
      placeholder:"Enter your password",
      label:"Password",
      componenttype:'input',
    }

  ]


  export const adminAddProductformControls = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter name",
      label: "Name",
      componentType: "input",
    },
    {
      id: "price",
      type: "number",
      placeholder: "Enter price",
      label: "Price",
      componentType: "input",
    },
    {
      id: "description",
      type: "text",
      placeholder: "Enter description",
      label: "Description",
      componentType: "input",
    },
    {
      id: "category",
      type: "",
      placeholder: "",
      label: "Category",
      componentType: "select",
      options: [
        {
          id: "men",
          label: "Men",
        },
        {
          id: "women",
          label: "Women",
        },
        {
          id: "kids",
          label: "Kids",
        },
      ],
    },
    {
      id: "deliveryInfo",
      type: "text",
      placeholder: "Enter deliveryInfo",
      label: "Delivery Info",
      componentType: "input",
    },
    {
      id: "onSale",
      type: "",
      placeholder: "",
      label: "On Sale",
      componentType: "select",
      options: [
        {
          id: "yes",
          label: "Yes",
        },
        {
          id: "no",
          label: "No",
        },
      ],
    },
    {
      id: "priceDrop",
      type: "number",
      placeholder: "Enter Price Drop",
      label: "Price Drop",
      componentType: "input",
    },
  ];
  export const AvailableSizes = [
    {
      id: "s",
      label: "S",
    },
    {
      id: "m",
      label: "M",
    },
    {
      id: "l",
      label: "L",
    },
  ];

  export const firebasestorageURl="gs://ebuyecom-9fdf3.appspot.com";
  export const addNewAddressFormControls = [
    {
      id: "fullname",
      type: "input",
      placeholder: "Enter your full name",
      label: "Full Name",
      componentType: "input",
    },
    {
      id: "address",
      type: "input",
      placeholder: "Enter your full address",
      label: "Address",
      componentType: "input",
    },
    {
      id: "city",
      type: "input",
      placeholder: "Enter your city",
      label: "City",
      componentType: "input",
    },
    {
      id: "country",
      type: "input",
      placeholder: "Enter your country",
      label: "Country",
      componentType: "input",
    },
    {
      id: "postalcode",
      type: "input",
      placeholder: "Enter your postal code",
      label: "Postal Code",
      componentType: "input",
    },
  ];