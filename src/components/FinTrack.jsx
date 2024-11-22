import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Flex,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

function FinTrack() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const toast = useToast();

  const addTransaction = () => {
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const calculateTotal = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "income"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  return (
    <Container maxW={"container.md"} p={{ base: 4, md: 8 }}>
      <Box bg="white" p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="xl">
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg">
            FinTrack
          </Heading>

          <VStack spacing={4}>
            <Flex direction={{ base: "column", md: "row" }} gap={4} w="full">
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                size="lg"
              />
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                size="lg"
                w={{ base: "full", md: "200px" }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </Flex>

            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="lg"
            />

            <Button
              colorScheme="blue"
              onClick={addTransaction}
              w="full"
              size="lg"
            >
              Add Transaction
            </Button>
          </VStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>${transaction.amount.toFixed(2)}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.category}</Td>
                    <Td>
                      <IconButton
                        icon={<MdDelete size={18} />}
                        onClick={() => deleteTransaction(transaction.id)}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Delete transaction"
                      />
                    </Td>
                  </Tr>
                ))}
                {transactions.length === 0 && (
                  <Tr>
                    <Td colSpan={4} textAlign="center" py={8}>
                      <Text color="gray.500">No transactions yet</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md">
            <Flex justify="space-between" align="center">
              <Text fontWeight="semibold">Total Balance</Text>
              <Text
                fontWeight="bold"
                fontSize="xl"
                color={calculateTotal() >= 0 ? "green.500" : "red.500"}
              >
                ${calculateTotal().toFixed(2)}
              </Text>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}

export default FinTrack;
