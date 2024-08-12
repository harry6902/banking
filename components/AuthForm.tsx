'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomCard from './CustomCard'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { execFile } from 'child_process'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'





const AuthForm = ({type}:{type:string}) => {

    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  const  onSubmit=async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      //Sign-up with app write

      if(type==='signup'){

        const userdata ={
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }


        const newUser = await signUp(userdata);
        setUser(newUser);

      }
      if(type==='signin'){

        const response =await signIn({
          email:data.email,
          password:data.password
        })

        if(response)router.push("/");


      }
      
    } catch (error) {
     console.log(error); 
    }finally{
    setIsLoading(false);
    }
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>

      <Link href={"/"}
            className='flex cursor-pointer
            items-center gap-1'
            >
                <Image
                className='size-[24px] 
                max-xl:size-14'
                src={"/icons/logo.svg"}
                width={34}
                height={34}
                alt='logo'
                />
                <h1 className='sidebar-logo'>Horizon</h1>
             
             </Link>
             <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {
                        user ? 'Link Account': type==='signin' 
                        ? 'SignIn' :'SignUp'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {
                            user ? 'Link your account to get started'
                            :'Please enter your details'
                        }

                    </p>

                </h1>

             </div>

      </header>

       { user ? ( 
            <div className='flex flex-col gap-4'>
                <PlaidLink
                user={user}
                variant="primary"
                
                />
            </div>
         ):( 
            <>
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {
          type==='signup' && (
            <>
        <div className='flex gap-4'>
        <CustomCard 
        control={form.control}
        name='firstName'
        label='First Name'
        placeholder='Enter your first name'
        />
        <CustomCard 
        control={form.control}
        name='lastName'
        label='Last Name'
        placeholder='Enter your lastname'
        />
        </div>
        <CustomCard 
        control={form.control}
        name='address1'
        label='Address'
        placeholder='Enter your specific address'
        />
             <CustomCard 
        control={form.control}
        name='city'
        label='City'
        placeholder='Example: Hanamkonda'
        /> 
        <div className='flex gap-4'>
        <CustomCard 
        control={form.control}
        name='state'
        label='State'
        placeholder='Example: Telangana'
        />
        <CustomCard 
        control={form.control}
        name='postalCode'
        label='Postal Code'
        placeholder='Example: 506001'
        />
        </div>
   

        <div className='flex gap-4'>
        <CustomCard 
        control={form.control}
        name='dateOfBirth'
        label='Date Of Birth'
        placeholder='YYYY-MM-DD'
        />
        <CustomCard 
        control={form.control}
        name='ssn'
        label='SSN'
        placeholder='Example: 1234'
        />
        </div>
            
            </>
          )
        }
      
        <CustomCard 
        control={form.control}
        name='email'
        label='Email'
        placeholder='Enter your Email'
        />
         <CustomCard 
        control={form.control}
        name='password'
        label='Password'
        placeholder='Enter your Password'
        />

        <div className='flex flex-col  gap-4'>
          <Button type="submit" className='form-btn' disabled={isLoading}>

          {
            isLoading ? (
              <>
              <Loader2 
              size={20} className='animate-spin'
              />&nbsp; Loading...
              </>
            ):type==='signin'
            ? 'Sign In' :'Sign Up'
          }
        </Button>
          </div>
      </form>
    </Form>

    <footer className='flex justify-center gap-1'>

      <p className='text-14 font-normal text-gray-600'>
        {
          type==='signin'? 
          "Don't have an account?" :
          "Already have an account?" 
        }
      </p>

      <Link className='form-link' href={type==='signin' ? '/sign-up' : '/sign-in'}>

      {type==='signin' ? 'SignUp' : 'SignIn'}
      </Link>

    </footer>
            </>
         ) } 
    </section>
  )
}

export default AuthForm
