import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

interface PhoneInputWithCountryProps {
  value: string;
  onChange: (value: string, countryData?: any) => void;
  inputClass?: string;
  containerClass?: string;
  placeholder?: string;
}

const PhoneInputWithCountry: React.FC<PhoneInputWithCountryProps> = ({ 
  value, 
  onChange, 
  inputClass = "form-control",
  containerClass = "",
  placeholder = "Mobile"
}) => {
  return (
    <div className={containerClass}>
      <PhoneInput
        country={'in'}
        value={value}
        onChange={(phone, country: any) => {
          // Pass both phone and country data to parent
          onChange(phone, country);
        }}
        inputClass={inputClass}
        containerClass="phone-input-container"
        buttonClass="phone-input-button"
        dropdownClass="phone-input-dropdown"
        enableSearch
        disableDropdown={false}
        countryCodeEditable={true}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInputWithCountry;
