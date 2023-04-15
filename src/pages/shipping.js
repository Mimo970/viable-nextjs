// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import Link from "next/link";
// import { Breadcrumb } from "react-bootstrap";
// import { CartContext } from "../../contexts/CartContext";
// import Cookies from "js-cookie";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form"; // Import react-hook-form

// const ShippingAddressForm = () => {
//   const { cart, shippingAddress, setShippingAddress } = useContext(CartContext);
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: {},
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     setShippingAddress(formData);
//     Cookies.set("shippingAddress", JSON.stringify(formData));
//     router.push("/order");
//     // console.log(formData); // do something with the form data
//   }
//   // console.log(shippingAddress);

//   useEffect(() => {
//     // Load the cart from cookies when the component mounts
//     const shippingAddress = Cookies.get("shippingAddress");
//     if (shippingAddress) {
//       setShippingAddress(JSON.parse(shippingAddress));
//     }
//     console.log(shippingAddress);
//   }, []);
//   console.log(shippingAddress);
//   return (
//     <Layout>
//       <div className="bg-[#15202B]">
//         <div className="pt-48 py-36   ">
//           <div className="mx-64">
//             <Breadcrumb>
//               <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//               <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
//               <Breadcrumb.Item active>Shipping</Breadcrumb.Item>

//               {/* <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item> */}
//               <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
//             </Breadcrumb>
//           </div>

//           <form
//             className="flex flex-col mx-auto bg-[#22303C] w-1/4 rounded-lg shadow-md p-8 "
//             onSubmit={handleSubmit}
//           >
//             <div className="mb-6 flex flex-col">
//               <label className="text-white" htmlFor="country">
//                 Country
//               </label>
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="name"
//                 className="text-white block text-gray-700 font-semibold mb-2"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="John Doe"
//                 className=" w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="address"
//                 className="text-white block text-gray-700 font-semibold mb-2"
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 placeholder="123 Main St."
//                 className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="city"
//                 className="text-white block text-gray-700 font-semibold mb-2"
//               >
//                 City
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 placeholder="New York"
//                 className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="state"
//                 className="text-white block text-gray-700 font-semibold mb-2"
//               >
//                 State
//               </label>
//               <input
//                 type="text"
//                 id="state"
//                 name="state"
//                 placeholder="NY"
//                 className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={formData.state}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="zip"
//                 className="text-white block text-gray-700 font-semibold mb-2"
//               >
//                 ZIP Code
//               </label>
//               <input
//                 type="text"
//                 id="zip"
//                 name="zip"
//                 placeholder="10001"
//                 className="w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={formData.zip}
//                 onChange={handleChange}
//               />
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="no-underline bg-[#009BF9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
//             >
//               Proceed to checkout
//             </button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ShippingAddressForm;

{
  /* <select
  value={formData.country}
  onChange={handleChange}
  id="country"
  name="country"
  class="form-control"
>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Åland Islands">Åland Islands</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="American Samoa">American Samoa</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Anguilla">Anguilla</option>
  <option value="Antarctica">Antarctica</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Aruba">Aruba</option>
  <option value="Australia">Australia</option>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bermuda">Bermuda</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Bouvet Island">Bouvet Island</option>
  <option value="Brazil">Brazil</option>
  <option value="British Indian Ocean Territory">
    British Indian Ocean Territory
  </option>
  <option value="Brunei Darussalam">Brunei Darussalam</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Cape Verde">Cape Verde</option>
  <option value="Cayman Islands">Cayman Islands</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Christmas Island">Christmas Island</option>
  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Congo">Congo</option>
  <option value="Congo, The Democratic Republic of The">
    Congo, The Democratic Republic of The
  </option>
  <option value="Cook Islands">Cook Islands</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Cote D'ivoire">Cote D'ivoire</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czech Republic">Czech Republic</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Falkland Islands (Malvinas)">
    Falkland Islands (Malvinas)
  </option>
  <option value="Faroe Islands">Faroe Islands</option>
  <option value="Fiji">Fiji</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="French Guiana">French Guiana</option>
  <option value="French Polynesia">French Polynesia</option>
  <option value="French Southern Territories">
    French Southern Territories
  </option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Gibraltar">Gibraltar</option>
  <option value="Greece">Greece</option>
  <option value="Greenland">Greenland</option>
  <option value="Grenada">Grenada</option>
  <option value="Guadeloupe">Guadeloupe</option>
  <option value="Guam">Guam</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guernsey">Guernsey</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-bissau">Guinea-bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Heard Island and Mcdonald Islands">
    Heard Island and Mcdonald Islands
  </option>
  <option value="Holy See (Vatican City State)">
    Holy See (Vatican City State)
  </option>
  <option value="Honduras">Honduras</option>
  <option value="Hong Kong">Hong Kong</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Isle of Man">Isle of Man</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jersey">Jersey</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Korea, Democratic People's Republic of">
    Korea, Democratic People's Republic of
  </option>
  <option value="Korea, Republic of">Korea, Republic of</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Lao People's Democratic Republic">
    Lao People's Democratic Republic
  </option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Macao">Macao</option>
  <option value="Macedonia, The Former Yugoslav Republic of">
    Macedonia, The Former Yugoslav Republic of
  </option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Martinique">Martinique</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mayotte">Mayotte</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia, Federated States of">
    Micronesia, Federated States of
  </option>
  <option value="Moldova, Republic of">Moldova, Republic of</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolia">Mongolia</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Montserrat">Montserrat</option>
  <option value="Morocco">Morocco</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Myanmar">Myanmar</option>
  <option value="Namibia">Namibia</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Netherlands">Netherlands</option>
  <option value="Netherlands Antilles">Netherlands Antilles</option>
  <option value="New Caledonia">New Caledonia</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="Niue">Niue</option>
  <option value="Norfolk Island">Norfolk Island</option>
  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
  <option value="Norway">Norway</option>
  <option value="Oman">Oman</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palau">Palau</option>
  <option value="Palestinian Territory, Occupied">
    Palestinian Territory, Occupied
  </option>
  <option value="Panama">Panama</option>
  <option value="Papua New Guinea">Papua New Guinea</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Peru">Peru</option>
  <option value="Philippines">Philippines</option>
  <option value="Pitcairn">Pitcairn</option>
  <option value="Poland">Poland</option>
  <option value="Portugal">Portugal</option>
  <option value="Puerto Rico">Puerto Rico</option>
  <option value="Qatar">Qatar</option>
  <option value="Reunion">Reunion</option>
  <option value="Romania">Romania</option>
  <option value="Russian Federation">Russian Federation</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Saint Helena">Saint Helena</option>
  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
  <option value="Saint Lucia">Saint Lucia</option>
  <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
  <option value="Saint Vincent and The Grenadines">
    Saint Vincent and The Grenadines
  </option>
  <option value="Samoa">Samoa</option>
  <option value="San Marino">San Marino</option>
  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
  <option value="Saudi Arabia">Saudi Arabia</option>
  <option value="Senegal">Senegal</option>
  <option value="Serbia">Serbia</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapore">Singapore</option>
  <option value="Slovakia">Slovakia</option>
  <option value="Slovenia">Slovenia</option>
  <option value="Solomon Islands">Solomon Islands</option>
  <option value="Somalia">Somalia</option>
  <option value="South Africa">South Africa</option>
  <option value="South Georgia and The South Sandwich Islands">
    South Georgia and The South Sandwich Islands
  </option>
  <option value="Spain">Spain</option>
  <option value="Sri Lanka">Sri Lanka</option>
  <option value="Sudan">Sudan</option>
  <option value="Suriname">Suriname</option>
  <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
  <option value="Swaziland">Swaziland</option>
  <option value="Sweden">Sweden</option>
  <option value="Switzerland">Switzerland</option>
  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
  <option value="Taiwan">Taiwan</option>
  <option value="Tajikistan">Tajikistan</option>
  <option value="Tanzania, United Republic of">
    Tanzania, United Republic of
  </option>
  <option value="Thailand">Thailand</option>
  <option value="Timor-leste">Timor-leste</option>
  <option value="Togo">Togo</option>
  <option value="Tokelau">Tokelau</option>
  <option value="Tonga">Tonga</option>
  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
  <option value="Tunisia">Tunisia</option>
  <option value="Turkey">Turkey</option>
  <option value="Turkmenistan">Turkmenistan</option>
  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Uganda">Uganda</option>
  <option value="Ukraine">Ukraine</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="United States">United States</option>
  <option value="United States Minor Outlying Islands">
    United States Minor Outlying Islands
  </option>
  <option value="Uruguay">Uruguay</option>
  <option value="Uzbekistan">Uzbekistan</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Viet Nam">Viet Nam</option>
  <option value="Virgin Islands, British">Virgin Islands, British</option>
  <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
  <option value="Wallis and Futuna">Wallis and Futuna</option>
  <option value="Western Sahara">Western Sahara</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambia">Zambia</option>
  <option value="Zimbabwe">Zimbabwe</option>
</select>; */
}

import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"; // Import react-hook-form

const ShippingAddressForm = () => {
  const { cart, shippingAddress, setShippingAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm(); // Destructure the useForm hook and its methods

  // Update the form fields with the initial form data
  useEffect(() => {
    setValue("name", shippingAddress.name);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("state", shippingAddress.state);
    setValue("zip", shippingAddress.zip);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  // Watch for changes in the form fields and update the form data accordingly
  const formData = watch(); // Get the values of all form fields
  console.log(formData); // Use formData object to access form field values

  // Update the form data with the handleChange function
  function handleChange(event) {
    const { name, value } = event.target;
    setValue(name, value);
  }

  function onSubmit(data) {
    // Form data is valid, submit the form
    // ...
    console.log("form data is valid");

    setShippingAddress(data);
    Cookies.set("shippingAddress", JSON.stringify(data));
    router.push("/order");
  }

  useEffect(() => {
    // Load the cart from cookies when the component mounts
    const shippingAddress = Cookies.get("shippingAddress");
    if (shippingAddress) {
      setShippingAddress(JSON.parse(shippingAddress));
    }
    // console.log(shippingAddress);
  }, []);
  console.log(shippingAddress);
  console.log(formData);

  return (
    <Layout>
      <div className="bg-[#15202B]">
        <div className="pt-48 py-36   ">
          <div className="mx-64">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
              <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
              {/* <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item> */}
              <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <form
            className="flex flex-col mx-auto bg-[#22303C] w-1/4 rounded-lg shadow-md p-8 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-6 flex flex-col">
              <label className="text-white" htmlFor="country">
                Country
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className={
                  errors.name
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.name}
                onChange={(event) => handleChange(event, "name")}
                // onChange={handleChange}
                {...register("name", {
                  required: "Please enter full name",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Main St."
                className={
                  errors.address
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.address}
                // onChange={(event) => handleChange(event, formData.address)} // Update the onChange event handler
                onChange={handleChange}
                {...register("address", {
                  required: "Please enter address",
                })}
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="city"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                className={
                  errors.city
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.city}
                onChange={handleChange}
                {...register("city", {
                  required: "Please enter city",
                })}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="state"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="NY"
                className={
                  errors.state
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.state}
                onChange={handleChange}
                {...register("state", {
                  required: "Please enter state",
                })}
              />
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="zip"
                className="text-white block text-gray-700 font-semibold mb-2"
              >
                Zip
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="12345"
                className={
                  errors.zip
                    ? "w-full px-4 py-2 rounded-lg border-red-500 focus:outline-none focus:border-indigo-500"
                    : "w-full px-4 py-2 rounded-lg border-gray-400 focus:outline-none focus:border-indigo-500"
                }
                // value={formData.zip}
                onChange={handleChange}
                {...register("zip", {
                  required: "Please enter zip code",
                })}
              />
              {errors.zip && (
                <span className="text-red-500">{errors.zip.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddressForm;
