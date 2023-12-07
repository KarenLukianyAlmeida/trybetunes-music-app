type DisableProps = {
  length: number;
  event: React.ChangeEvent<HTMLInputElement>;
};

export const handleNameChange = ({ length, event }: DisableProps) => {
  setName(target.value);
  if (target.value.length >= 3) {
    setBtnDisabled(false);
  }
};
