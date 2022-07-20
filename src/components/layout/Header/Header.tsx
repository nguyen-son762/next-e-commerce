import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import logo from '~/public/logo_400x.webp'
import SearchIcon from '@mui/icons-material/Search'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomTextField from '@/components/atoms/CustomTextField'
import { makeStyles } from '@mui/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import { memo } from 'react'
import useStore from '@/auth/store/auth'

const schema = yup.object({
  keyword: yup.string().trim().required('Keyword is required'),
})
const useStyles = makeStyles({
  iconSearch: {
    position: 'absolute!important' as any,
    bottom: 0,
    right: 0,
  },
})

function Header() {
  const { user } = useStore()
  const formik = useFormik({
    initialValues: {
      keyword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  const classess = useStyles()
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      py={2}
      px={5}
    >
      <Image src={logo} width={200} height={50} alt="roya" />
      <Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          alignItems="end"
          position="relative"
        >
          <CustomTextField
            fullWidth
            name="keyword"
            width={250}
            label="Search"
            value={formik.values.keyword}
            onChange={formik.handleChange}
            isTextSearch
          />
          <Button
            type="submit"
            className={classess.iconSearch}
            sx={{
              minWidth: 50,
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Link href={user && user.user_id ? '/account' : '/account/login'}>
          <Typography
            sx={{
              cursor: 'pointer',
            }}
            mr={2}
          >
            Account
          </Typography>
        </Link>
        <ShoppingCartIcon />
      </Box>
    </Box>
  )
}

export default memo(Header)
