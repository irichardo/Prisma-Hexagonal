import { useState } from "react";
import { ILoginForm } from "../types/loginTypes";

export const useForm = () =>{
    const [form, setForm] = useState<ILoginForm>({
        email: "",
        password: "",
      });
      const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { id, value } = event.target;
        setForm({ ...form, [id]: value });
      };
      return {form, formHandler}
}

