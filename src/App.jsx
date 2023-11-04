import React, { useState } from 'react'
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyinfo'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import Background from './Image';

function App() {
    const [amount,setAmount]=useState(0);
    const [from, setFrom]=useState("usd")
    const [to, setTo]=useState("inr")
    const [convertedAmount, setconvertedAmount]=useState(0)
    const [bgImage,setbgImage]=useState(`url('https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`)

    const CurrencyInfo=useCurrencyInfo(from)
    //extracting all key from object
    const options = Object.keys(CurrencyInfo)

    const swap=()=>{
        setFrom(to);
        setTo(from);
        setconvertedAmount(amount);
        setAmount(convertedAmount)
    }
//show final result
    const convert =()=>{
        setconvertedAmount(amount*CurrencyInfo[to])
    }
//reset button functionality
    function handelReset(){
        setAmount(0)
        setFrom("usd")
        setTo("inr")
        setconvertedAmount(0)
    }
// generating random value
    var random=Math.floor(Math.random()*5);

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                // backgroundImage: `url('https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
                backgroundImage: bgImage
                // backgroundImage: `url(${Background[random].Image})`
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                            setbgImage(`url(${Background[random].Image})`)
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>
                                // setAmount(amount)
                                setFrom(currency)
                                }
                                selectCurrency={from}
                                onAmountChange={(amount)=>
                                setAmount(amount)
                                }
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                <SwapVerticalCircleIcon/>
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>
                                setTo(currency)
                                }
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                        <button onClick={handelReset} className="w-full bg-red-600 text-white px-4 py-3 my-2 rounded-lg">
                            Reset Data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;