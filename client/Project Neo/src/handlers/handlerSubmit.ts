export const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = e.currentTarget.email.value;
    const { password } = e.currentTarget.password.value;
    return { email, password }
};
