import { useState, useEffect } from 'react'
import { Package, BarChart3, Plus, Search, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import './App.css'

// Dados mock para demonstração
const mockData = [
  { id: 1, subcategoria: 'BAR', descricao: 'AGUA MINERAL S/ GAS 1,5', unidade: 'UNIDADE', deposito: 254, estoqueReal: 177, status: 'OK' },
  { id: 2, subcategoria: 'BAR', descricao: 'AGUA C/ GAS 500 ML', unidade: 'UNIDADE', deposito: 84, estoqueReal: -82, status: 'REALIZAR PEDIDO' },
  { id: 3, subcategoria: 'BAR', descricao: 'COCA COLA, LATA 350 ML', unidade: 'UNIDADE', deposito: 84, estoqueReal: 45, status: 'REALIZAR PEDIDO' },
  { id: 4, subcategoria: 'BAR', descricao: 'CAFE TRES CORACOES', unidade: 'UNIDADE', deposito: 10, estoqueReal: 10, status: 'ALERTA' },
  { id: 5, subcategoria: 'KIDS', descricao: 'SALGADINHOS', unidade: 'UNIDADE', deposito: 192, estoqueReal: 192, status: 'OK' },
  { id: 6, subcategoria: 'KIDS', descricao: 'BISCOITO OREO', unidade: 'UNIDADE', deposito: 6, estoqueReal: 6, status: 'ALERTA' },
  { id: 7, subcategoria: 'LIMPEZA', descricao: 'PAPEL TOALHA BOBINA', unidade: 'UNIDADE', deposito: 59, estoqueReal: 59, status: 'OK' },
  { id: 8, subcategoria: 'LIMPEZA', descricao: 'AGUA SANITARIA 5L', unidade: 'UNIDADE', deposito: 1, estoqueReal: 1, status: 'ALERTA' },
  { id: 9, subcategoria: 'ADMINISTRATIVO', descricao: 'RESMA DE PAPEL A4', unidade: 'PACOTE', deposito: 35, estoqueReal: 35, status: 'OK' }
]

const StatusBadge = ({ status }) => {
  const colors = {
    'OK': 'bg-green-100 text-green-800',
    'ALERTA': 'bg-yellow-100 text-yellow-800',
    'REALIZAR PEDIDO': 'bg-red-100 text-red-800'
  }
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>
}

function App() {
  const [estoque, setEstoque] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setEstoque(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredItems = estoque.filter(item =>
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subcategoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: estoque.length,
    alertas: estoque.filter(item => item.status === 'ALERTA').length,
    pedidos: estoque.filter(item => item.status === 'REALIZAR PEDIDO').length,
    ok: estoque.filter(item => item.status === 'OK').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium text-gray-700">Carregando dados do estoque...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Estoque</h1>
                <p className="text-sm text-gray-500">GAV Resorts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.alertas}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Realizar Pedido</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pedidos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">OK</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.ok}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar itens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
          </h2>
          
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.descricao}</p>
                        <p className="text-sm text-gray-600">{item.subcategoria}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Estoque Real</p>
                        <p className="font-semibold text-lg">{item.estoqueReal} <span className="text-sm font-normal">{item.unidade}</span></p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Deposito</p>
                        <p className="font-medium">{item.deposito} <span className="text-sm font-normal">{item.unidade}</span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

