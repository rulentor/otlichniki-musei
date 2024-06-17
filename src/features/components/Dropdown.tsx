"use client"
import { ICategory } from "@/entities"
import { startTransition, useEffect, useState } from "react"
import getAllCategories from "../api/get-all-categories.action"
import createCategory from "../api/create-category.action"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"

interface DropdownProps {
  value: string
  onChangeHandler: (title: string) => void
}
export default function CatDropdown({value, onChangeHandler}: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('')

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    }).then((category): void => {
      setCategories((prevState) => [...prevState, category])
      onChangeHandler(category.name)
    })
  }
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()
      categoryList && setCategories(categoryList)
    }
    getCategories()
  }, [])
  if (!categories[0]) return <>
    <Select disabled={true} />
  </>
  return (
    <Select defaultValue={value ? value : categories[0].name} onValueChange={(val) => onChangeHandler(val)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category._id} value={category.name} className="select-item p-regular-14" >
            {category.name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new Category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}