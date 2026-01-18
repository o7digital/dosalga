import React, { useEffect, useState } from "react";

/**
 * Reusable quantity selector with optional controlled mode.
 * If `value` and `onChange` are provided, the parent owns the state.
 * Otherwise the component manages its own internal quantity.
 */
function QuantityCounter({ value, onChange, min = 1, max = 10, initialValue = 1 }) {
  const [internalQuantity, setInternalQuantity] = useState(value ?? initialValue);

  useEffect(() => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      setInternalQuantity(value);
    }
  }, [value]);

  const clampQuantity = (nextValue) => {
    if (Number.isNaN(nextValue)) return min;
    return Math.min(max, Math.max(min, nextValue));
  };

  const updateQuantity = (nextValue) => {
    const safeValue = clampQuantity(nextValue);

    if (typeof onChange === "function") {
      onChange(safeValue);
    }

    if (value === undefined) {
      setInternalQuantity(safeValue);
    }
  };

  const handleInputChange = (event) => {
    const inputQuantity = parseInt(event.target.value, 10);
    updateQuantity(inputQuantity);
  };

  const increment = () => updateQuantity((value ?? internalQuantity) + 1);
  const decrement = () => updateQuantity((value ?? internalQuantity) - 1);

  const quantity = value ?? internalQuantity;

  return (
    <div className="quantity-counter">
      <div
        className="quantity__minus"
        style={{ cursor: "pointer" }}
        onClick={decrement}
      >
        <i className="bx bx-minus" />
      </div>
      <input
        name="quantity"
        type="text"
        className="quantity__input"
        value={quantity}
        onChange={handleInputChange}
      />
      <div
        className="quantity__plus"
        style={{ cursor: "pointer" }}
        onClick={increment}
      >
        <i className="bx bx-plus" />
      </div>
    </div>
  );
}

export default QuantityCounter;
