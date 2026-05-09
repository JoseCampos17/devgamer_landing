import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", flag: "fi-us", dialCode: "+1" },
  { code: "MX", name: "México", flag: "fi-mx", dialCode: "+52" },
  { code: "CO", name: "Colombia", flag: "fi-co", dialCode: "+57" },
  { code: "AR", name: "Argentina", flag: "fi-ar", dialCode: "+54" },
  { code: "BR", name: "Brasil", flag: "fi-br", dialCode: "+55" },
  { code: "CL", name: "Chile", flag: "fi-cl", dialCode: "+56" },
  { code: "PE", name: "Perú", flag: "fi-pe", dialCode: "+51" },
  { code: "VE", name: "Venezuela", flag: "fi-ve", dialCode: "+58" },
  { code: "EC", name: "Ecuador", flag: "fi-ec", dialCode: "+593" },
  { code: "BO", name: "Bolivia", flag: "fi-bo", dialCode: "+591" },
  { code: "PY", name: "Paraguay", flag: "fi-py", dialCode: "+595" },
  { code: "UY", name: "Uruguay", flag: "fi-uy", dialCode: "+598" },
  { code: "ES", name: "España", flag: "fi-es", dialCode: "+34" },
  { code: "GB", name: "United Kingdom", flag: "fi-gb", dialCode: "+44" },
  { code: "DE", name: "Deutschland", flag: "fi-de", dialCode: "+49" },
  { code: "FR", name: "France", flag: "fi-fr", dialCode: "+33" },
  { code: "IT", name: "Italia", flag: "fi-it", dialCode: "+39" },
  { code: "CA", name: "Canada", flag: "fi-ca", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: "fi-au", dialCode: "+61" },
  { code: "JP", name: "日本", flag: "fi-jp", dialCode: "+81" },
  { code: "CN", name: "中国", flag: "fi-cn", dialCode: "+86" },
  { code: "IN", name: "India", flag: "fi-in", dialCode: "+91" },
];

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CountryPhoneInput({
  value,
  onChange,
  placeholder = "1234567890",
}: CountryPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
  );

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/\D/g, "");
    onChange(phoneNumber);
  };

  return (
    <div className="flex gap-2">
      {/* Country Selector */}
      <div className="relative w-32" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 rounded-md border border-slate-600/40 bg-slate-900/50 text-white hover:border-violet-500/60 transition-all duration-200 flex items-center justify-between gap-2 text-sm"
        >
          <span className={`fi ${selectedCountry.flag}`} style={{ width: '1.2em', height: '0.9em' }}></span>
          <span className="text-xs font-medium">{selectedCountry.dialCode}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-violet-500/30 rounded-md shadow-lg z-50 max-h-64 overflow-hidden flex flex-col">
            {/* Search */}
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border-b border-slate-700 bg-slate-900 text-white text-xs focus:outline-none focus:border-violet-500/60"
            />

            {/* Country List */}
            <div className="overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${selectedCountry.code === country.code
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-slate-300 hover:bg-violet-600/10 hover:text-white"
                    }`}
                >
                  <span className={`fi ${country.flag}`} style={{ width: '1.2em', height: '0.9em' }}></span>
                  <span className="text-slate-500 font-medium">{country.dialCode}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phone Input */}
      <input
        type="tel"
        value={value}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-md border border-slate-600/40 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 text-sm"
      />
    </div>
  );
}
