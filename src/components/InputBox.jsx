import React, { useId, useState } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions=[],
    selectCurrency="usd",
    amountDisable=false,
    cuurencyDisable=false,
}) {
    //getting unique value
    const amountInputId=useId();
    const [visit,setVisit]=useState(false);

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex `}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    min={0}
                    placeholder="Amount"
                    // is input field is disable?
                    disabled={amountDisable}
                    value={amount}
                    // checking if onAmountChange is available or not by && sign
                    onChange={(e) => {
                        const { value } = e.target;
                        let string=value.toString();
                        // onAmountChange(value.startsWith('0') && string.length==1 ? value.replace(0, '') : value)
                        // onAmountChange(value.replace('0', ''));
                        setVisit(true);
                        onAmountChange(value==0 && setVisit===true? value.replace(0, ''):value);
                        setVisit(false);
                        // onAmountChange(Number(e.target.value))
                    }}
                    // onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={cuurencyDisable}
                >

                        {currencyOptions.map((currency)=>
                        (
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        )
                        )}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
