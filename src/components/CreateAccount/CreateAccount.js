import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { UserData } from "../../api/api";

const CreateAccount = ({ onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [contactPersonError, setContactPersonError] = useState("");

  const handleInputChange = (fieldName, value) => {
    // Clear previous error for the field
    switch (fieldName) {
      case "name":
        setNameError("");
        break;
      case "address":
        setAddressError("");
        break;
      case "phoneNumber":
        setPhoneNumberError("");
        break;
      case "state":
        setStateError("");
        break;
      case "city":
        setCityError("");
        break;
      case "country":
        setCountryError("");
        break;
      case "pinCode":
        setPinCodeError("");
        break;
      case "contactPerson":
        setContactPersonError("");
        break;
      default:
        break;
    }

    // Perform validation as the user types
    if (fieldName === "phoneNumber") {
      // Remove non-digit characters from the input
      const numericValue = value.replace(/\D/g, "");

      // Check if the numeric value has more than 10 digits
      if (numericValue.length <= 10) {
        setPhoneNumber(numericValue);
      }
    } else {
      // Update the state for the field
      switch (fieldName) {
        case "name":
          setName(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "phoneNumber":
          setPhoneNumber(value);
          break;
        case "state":
          setState(value);
          break;
        case "city":
          setCity(value);
          break;
        case "country":
          setCountry(value);
          break;
        case "pinCode":
          setPinCode(value);
          break;
        case "contactPerson":
          setContactPerson(value);
          break;
        default:
          break;
      }
    }
  };

  const handleInputBlur = (fieldName) => {
    // Perform validation when the input field loses focus (onBlur)
    switch (fieldName) {
      case "name":
        if (name === "") {
          setNameError("Name is required");
        }
        break;
      case "address":
        if (address === "") {
          setAddressError("Address is required");
        }
        break;
      case "phoneNumber":
        if (phoneNumber === "" || phoneNumber.length !== 10) {
          setPhoneNumberError("Phone Number must be a 10-digit number");
        }
        break;
      case "state":
        if (state === "") {
          setStateError("State is required");
        }
        break;
      case "city":
        if (city === "") {
          setCityError("City is required");
        }
        break;
      case "country":
        if (country === "") {
          setCountryError("Country is required");
        }
        break;
      case "pinCode":
        if (pinCode === "") {
          setPinCodeError("Pincode is required");
        }
        break;
      case "contactPerson":
        if (contactPerson === "") {
          setContactPersonError("Contact Person is required");
        }
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async () => {
    // Clear previous errors
    clearErrors();

    // Validate all input fields on form submission
    let isValid = true;

    if (name === "") {
      setNameError("Name is required");
      isValid = false;
    }

    if (address === "") {
      setAddressError("Address is required");
      isValid = false;
    }

    if (phoneNumber === "" || phoneNumber.length !== 10) {
      setPhoneNumberError("Phone Number must be a 10-digit number");
      isValid = false;
    }

    if (state === "") {
      setStateError("State is required");
      isValid = false;
    }

    if (city === "") {
      setCityError("City is required");
      isValid = false;
    }

    if (country === "") {
      setCountryError("Country is required");
      isValid = false;
    }

    if (pinCode === "") {
      setPinCodeError("Pincode is required");
      isValid = false;
    }

    if (contactPerson === "") {
      setContactPersonError("Contact Person is required");
      isValid = false;
    }

    // Add more validation for other fields as needed

    if (isValid) {
      onClose();
      console.log("Form submitted.");
      try {
        // Make an API request to store form data
        const response = await UserData({
          name,
          address,
          phoneNumber,
          state,
          city,
          country,
          pinCode,
          contactPerson,
        });
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }
  };

  const clearErrors = () => {
    setNameError("");
    setAddressError("");
    setPhoneNumberError("");
    setStateError("");
    setCityError("");
    setCountryError("");
    setPinCodeError("");
    setContactPersonError("");
  };

  const handleClose = () => {
    onClose();
    console.log("close");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, nameError && styles.inputError]}
        placeholder="Name"
        value={name}
        onChangeText={(text) => handleInputChange("name", text)}
        onBlur={() => handleInputBlur("name")}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        style={[styles.input, addressError && styles.inputError]}
        placeholder="Address"
        value={address}
        onChangeText={(text) => handleInputChange("address", text)}
        onBlur={() => handleInputBlur("address")}
      />
      {addressError ? (
        <Text style={styles.errorText}>{addressError}</Text>
      ) : null}
      <TextInput
        style={[styles.input, phoneNumberError && styles.inputError]}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        onBlur={() => handleInputBlur("phoneNumber")}
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}
      <View style={styles.rowContainer}>
        <View style={styles.flex1}>
          <TextInput
            style={[styles.input, stateError && styles.inputError]}
            placeholder="State"
            value={state}
            onChangeText={(text) => handleInputChange("state", text)}
            onBlur={() => handleInputBlur("state")}
          />
          {stateError ? (
            <Text style={styles.errorText}>{stateError}</Text>
          ) : null}
        </View>
        <View style={styles.flex1}>
          <TextInput
            style={[styles.input, cityError && styles.inputError]}
            placeholder="City"
            value={city}
            onChangeText={(text) => handleInputChange("city", text)}
            onBlur={() => handleInputBlur("city")}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.flex1}>
          <TextInput
            style={[styles.input, countryError && styles.inputError]}
            placeholder="Country"
            value={country}
            onChangeText={(text) => handleInputChange("country", text)}
            onBlur={() => handleInputBlur("country")}
          />
          {countryError ? (
            <Text style={styles.errorText}>{countryError}</Text>
          ) : null}
        </View>
        <View style={styles.flex1}>
          <TextInput
            style={[styles.input, pinCodeError && styles.inputError]}
            placeholder="Pincode"
            value={pinCode}
            onChangeText={(text) => handleInputChange("pinCode", text)}
            onBlur={() => handleInputBlur("pinCode")}
          />
          {pinCodeError ? (
            <Text style={styles.errorText}>{pinCodeError}</Text>
          ) : null}
        </View>
      </View>
      <TextInput
        style={[styles.input, contactPersonError && styles.inputError]}
        placeholder="Contact Person"
        value={contactPerson}
        onChangeText={(text) => handleInputChange("contactPerson", text)}
        onBlur={() => handleInputBlur("contactPerson")}
      />
      {contactPersonError ? (
        <Text style={styles.errorText}>{contactPersonError}</Text>
      ) : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 90,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    position: "fixed",
    bottom: 20,
  },
  submitButton: {
    width: 130,
    backgroundColor: "black",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    height: 50,
    fontSize: 20,
    marginLeft: 120,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "black",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  flex1: {
    flex: 1,
    marginRight: 10,
  },
});

export default CreateAccount;
