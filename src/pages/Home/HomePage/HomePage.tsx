import { useState } from 'react'
import Select from 'react-select'

function HomePage() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const handleChange = (value) => {
    console.log(value)
    setDefValue(value)
  }

  const [defValue, setDefValue] = useState<string>('')

  return (
    <div className='relative'>
      <h2> HOME PAGE </h2>
      <Select
        options={options}
        styles={{
          control: (styles) => ({
            ...styles,
            borderColor: 'unset',
            boxShadow: 'unset',
            ':hover': {
              borderColor: 'unset',
            },
          }),
          option: (styles, { isSelected, isFocused }) => {
            return {
              ...styles,
              backgroundColor: isSelected
                ? 'grey'
                : isFocused
                ? 'grey'
                : undefined,
              color: 'black',
              ':active': {
                ...styles[':active'],
                backgroundColor: isSelected ? '#b4b4b4' : undefined,
              },
            }
          },
        }}
      />
      <input type='text' value={defValue} onChange={(event) => handleChange(event.target.value)} />
      <button onClick={() => setDefValue('')}>CLICK</button>
    </div>
  )
}
export default HomePage
