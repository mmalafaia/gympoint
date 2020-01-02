import React, { useRef, useEffect, useState } from 'react';
import { useField, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Input
        type="date"
        name={fieldName}
        selected={parseISO(selected)}
        onChange={date => {
          console.tron.log(date.target.value);
          setSelected(parseISO(date));
        }}
        ref={ref}
        dateFormat="dd/MM/yyyy"
        locale={pt}
      />
      {error && <span>{error}</span>}
    </>
  );
}
