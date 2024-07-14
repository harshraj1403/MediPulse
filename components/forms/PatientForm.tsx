"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input"
  import CustomFormField from "../CustomFormField";
  import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";

    
export enum FormFieldType{
  INPUT='input',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton'
}


  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })


 const PatientForm = () => {
  const router=useRouter();

  const [isLoading,setIsLoading]=useState(false);
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
         name: "",
         email: "",
         phone: "",
        },
      })

  

      async function onSubmit({name,email,phone}:z.infer<typeof UserFormValidation>){
        setIsLoading(true);
        try{
           const  userData={name,email,phone};
          const user=await createUser(userData);
          if (user) {
                  router.push(`/patients/${user.$id}/register`);
                }
        }
        catch(error){
          console.log(error)
        }
        setIsLoading(false)
      }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4"> 
            <h1> Hi There👋</h1>
            <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="Tony Stark"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

         <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="tonystark@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

      <SubmitButton  isLoading={isLoading}>
        Get Started
      </SubmitButton>
    </form>
  </Form>

  )
}

export default PatientForm