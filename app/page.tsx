'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import { ProfileHeader } from '@/components/Home'

export default function Page() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
    </>
  )
} 