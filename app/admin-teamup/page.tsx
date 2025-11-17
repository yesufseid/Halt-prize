"use client"

import React, { useEffect ,useState} from 'react'
import TeamList from '../../components/TeamList'
import {getTeamsWithMembers} from '@/lib/GetallTeams'
import {formTeams} from "@/lib/TeamMaker"
import { findunsigned } from '@/lib/findunsignedstudent'
import Link from 'next/link'

type Student = {
  id: string
  student_id: string
  full_name: string
  department: string
  batch: string
  sdgs: string[]
  skills: string[]
  preferred_team_size: number,
  roles:string[],
  phone:string

}
type students={
    students:Student
}
type Team = {
  id: string
  name: string
preferred_size: number
  team_members: students[]
}


type all={
  allstudent:number
  unsign:string[]
}

export default function page() {
  const [data,setData]=useState<Team[]>([])
  const [allnumber,setallnumber]=useState<all>()
 const [loading,setloading]=useState(false)
  const[contol,setControl]=useState(false)

    useEffect(()=>{
      
       
        const handle=async()=>{
          const unsign:any=await findunsigned()
          setallnumber(unsign)
             const data:any=await getTeamsWithMembers()
        data&&setData(data)
        }
        handle()
    },[contol])
const Handlegenerat=async()=>{
  setloading(true)
      await formTeams()
      setloading(false)
      setControl(!contol)
}
  return (
     <div className="min-h-screen bg-gray-100 md:p-6">
      <button
        onClick={Handlegenerat}
        className=" bg-primary  cursor-pointer w-32 text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
       {loading?"loading...":"generate team"} 
      </button>
      <Link 
               className=" bg-primary  px-3 ml-3 cursor-pointer w-32 text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"

      href={"/admin-teamup/generat"} >ADD Team</Link>
 
  <div className="flex flex-col mt-2 md:flex-row items-center mb-8 gap-4">
  <div className="flex items-center gap-4 w-full">
    <span className="px-4 py-2 text-white bg-amber-400 rounded-full font-semibold whitespace-nowrap">
      {allnumber?.allstudent}
    </span>

    {/* HORIZONTAL SCROLL */}
    <div className="flex overflow-x-auto space-x-2 max-w-full scrollbar-thin whitespace-nowrap">
      {allnumber?.unsign?.map((t, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-white border border-gray-300 rounded-lg shadow-sm inline-block"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
</div>


  {/* Heading */}
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
    Teams Overview
  </h1>

  {/* Teams List */}
  <TeamList teams={data} />
</div>

  )
}
