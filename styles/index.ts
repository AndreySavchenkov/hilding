export const customWorkerPageStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.75rem",
    color: "#fff",
    padding: "0.5rem",
    fontSize: "1.125rem",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    fontSize: "1.125rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
    fontSize: "1.125rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(59, 130, 246, 0.5)"
      : "transparent",
    color: "#fff",
    padding: "0.75rem 1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.3)",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.5)",
  }),
};

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.75rem",
    color: "#fff",
    padding: "0.5rem",
    fontSize: "1.125rem",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    fontSize: "1.125rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
    fontSize: "1.125rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(59, 130, 246, 0.5)"
      : "transparent",
    color: "#fff",
    padding: "0.75rem 1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.3)",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.5)",
  }),
};