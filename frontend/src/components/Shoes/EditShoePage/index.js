import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllShoes, getEditShoe, getDeletedShoe } from '../../../store/shoes'
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Textarea,
  Alert,
  AlertIcon,
  Text,
  Heading,
  Select,
  useColorModeValue,
  Icon,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { 
  FiEdit3, 
  FiTag, 
  FiDollarSign, 
  FiImage, 
  FiFileText,
  FiTrash2,
  FiSave
} from 'react-icons/fi'

function EditShoesFormChakra ({ shoe, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shoeId = shoe?.id
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [title, setTitle] = useState(shoe?.title || '')
  const [description, setDescription] = useState(shoe?.description || '')
  const [image, setImage] = useState(shoe?.image)
  const [brand, setBrand] = useState(shoe?.brand || '')
  const [errors, setErrors] = useState([])
  const [shoeSize, setShoeSize] = useState(shoe?.shoeSize || '')
  const [price, setPrice] = useState(shoe?.price || '')

  const updateTitle = (e) => setTitle(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateShoeSize = (e) => setShoeSize(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateBrand = (e) => setBrand(e.target.value)
  const updateImageFile = (e) => setImage(e.target.files[0])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(getEditShoe(title, shoeSize, image, price, brand, description, shoeId))
    if (!data.errors) {
      alert('Your changes have been updated.')
      dispatch(getAllShoes())
      onClose()
    } else {
      setErrors(data.errors)
    }
    return data
  }

  const handleDelete = async () => {
    await dispatch(getDeletedShoe(shoe.id))
    alert('Shoe has been deleted.')
    onDeleteClose()
    onClose()
    navigate('/sell')
  }

  const brandOptions = [
    { value: '', label: 'Select a brand' },
    { value: 'Nike', label: 'Nike' },
    { value: 'Air-Jordan', label: 'Air Jordan' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'Yeezy', label: 'Yeezy' },
    { value: 'New Balance', label: 'New Balance' },
    { value: 'Converse', label: 'Converse' },
    { value: 'Vans', label: 'Vans' }
  ]

  return (
    <Box p={8} maxW="4xl" mx="auto">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <HStack justify="center" spacing={3} mb={4}>
            <Icon as={FiEdit3} boxSize={8} color="blue.500" />
            <Heading size="xl" color="gray.800">Edit Your Listing</Heading>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            Update the details for your sneaker listing
          </Text>
        </Box>

        {/* Error Display */}
        {errors?.length > 0 && (
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <VStack align="flex-start" spacing={1}>
              {errors.map((error, idx) => (
                <Text key={idx} fontSize="sm">{error}</Text>
              ))}
            </VStack>
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <VStack spacing={8} align="stretch">
            {/* Basic Information */}
            <Box bg={cardBg} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} shadow="sm">
              <HStack spacing={3} mb={6}>
                <Icon as={FiTag} color="blue.500" boxSize={5} />
                <Heading size="md" color="gray.800">Basic Information</Heading>
              </HStack>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">Shoe Title</FormLabel>
                    <Input
                      placeholder="e.g., Air Jordan 1 Retro High"
                      value={title}
                      onChange={updateTitle}
                      bg="gray.50"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">Brand</FormLabel>
                    <Select
                      placeholder="Select brand"
                      value={brand}
                      onChange={updateBrand}
                      bg="gray.50"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                      size="lg"
                    >
                      {brandOptions.slice(1).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">Shoe Size (US Men's)</FormLabel>
                    <Input
                      type="number"
                      step="0.5"
                      min="3"
                      max="18"
                      placeholder="e.g., 10.5"
                      value={shoeSize}
                      onChange={updateShoeSize}
                      bg="gray.50"
                      borderColor="gray.300"
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                      size="lg"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="semibold">Price</FormLabel>
                    <InputGroup size="lg">
                      <InputLeftAddon 
                        children={<Icon as={FiDollarSign} />} 
                        bg="gray.100" 
                        borderColor="gray.300"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        min="1"
                        placeholder="199.99"
                        value={price}
                        onChange={updatePrice}
                        bg="gray.50"
                        borderColor="gray.300"
                        _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            {/* Description */}
            <Box bg={cardBg} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} shadow="sm">
              <HStack spacing={3} mb={6}>
                <Icon as={FiFileText} color="blue.500" boxSize={5} />
                <Heading size="md" color="gray.800">Description</Heading>
              </HStack>
              
              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="semibold">Product Description</FormLabel>
                <Textarea
                  placeholder="Describe the condition, colorway, and any special features of your sneakers..."
                  value={description}
                  onChange={updateDescription}
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                  resize="vertical"
                  minH="120px"
                  size="lg"
                />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Minimum 10 characters required
                </Text>
              </FormControl>
            </Box>

            {/* Image Upload */}
            <Box bg={cardBg} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} shadow="sm">
              <HStack spacing={3} mb={6}>
                <Icon as={FiImage} color="blue.500" boxSize={5} />
                <Heading size="md" color="gray.800">Product Images</Heading>
              </HStack>
              
              <FormControl>
                <FormLabel color="gray.700" fontWeight="semibold">Update Image (Optional)</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={updateImageFile}
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                  p={3}
                  size="lg"
                />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Leave empty to keep current image (JPG, PNG, or GIF)
                </Text>
              </FormControl>
            </Box>

            {/* Action Buttons */}
            <Box bg={cardBg} p={6} borderRadius="xl" borderWidth="1px" borderColor={borderColor} shadow="sm">
              <HStack spacing={4} justify="space-between">
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="lg"
                  onClick={onDeleteOpen}
                  leftIcon={<Icon as={FiTrash2} />}
                >
                  Delete Listing
                </Button>
                
                <HStack spacing={4}>
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    size="lg"
                    onClick={onClose}
                    px={8}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    px={8}
                    leftIcon={<Icon as={FiSave} />}
                  >
                    Save Changes
                  </Button>
                </HStack>
              </HStack>
            </Box>
          </VStack>
        </form>
      </VStack>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Listing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this sneaker listing? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default EditShoesFormChakra
