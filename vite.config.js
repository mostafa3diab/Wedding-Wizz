import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Header from './src/assets/Images/Header/Header.jpg'
import { backInOut } from 'motion/react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

const HeadStyle = {
  backgrounImage: `url(${Header})`,
  backgrounSize: 'cover'
}