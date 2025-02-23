import { countryFlags } from "./countryFlags";

export const Flag = ({ country }) => {
  return (
    <span>
      {countryFlags[country] ? (
        <img
          src={countryFlags[country]}
          alt={country}
          width={24}
          height={16}
          style={{ marginRight: "5px" }}
        />
      ) : (
        country + ","
      )}
    </span>
  );
};
