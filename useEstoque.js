import { useState, useEffect, useCallback } from 'react';

// Dados mock para demonstração
const mockEstoqueData = [
  {
    id: 1,
    subcategoria: 'BAR',
    descricao: 'AGUA MINERAL S/ GAS 1,5',
    unidade: 'UNIDADE',
    deposito: 254,
    estoqueReal: 177,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'OK'
  },
  {
    id: 2,
    subcategoria: 'BAR',
    descricao: 'AGUA C/ GAS 500 ML',
    unidade: 'UNIDADE',
    deposito: 84,
    estoqueReal: -82,
    mediaDiaria: 18.44,
    prazoPedido: 15,
    diasEstoque: -4,
    estoqueMinimo: 276.67,
    status: 'REALIZAR PEDIDO'
  },
  {
    id: 3,
    subcategoria: 'BAR',
    descricao: 'COCA COLA, LATA 350 ML',
    unidade: 'UNIDADE',
    deposito: 84,
    estoqueReal: 45,
    mediaDiaria: 4.33,
    prazoPedido: 15,
    diasEstoque: 10,
    estoqueMinimo: 65.00,
    status: 'REALIZAR PEDIDO'
  },
  {
    id: 4,
    subcategoria: 'BAR',
    descricao: 'COCA COLA ZERO, LATA 350 ML',
    unidade: 'UNIDADE',
    deposito: 48,
    estoqueReal: 13,
    mediaDiaria: 5.00,
    prazoPedido: 15,
    diasEstoque: 3,
    estoqueMinimo: 75.00,
    status: 'REALIZAR PEDIDO'
  },
  {
    id: 5,
    subcategoria: 'BAR',
    descricao: 'CAFE TRES CORACOES',
    unidade: 'UNIDADE',
    deposito: 10,
    estoqueReal: 10,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'ALERTA'
  },
  {
    id: 6,
    subcategoria: 'KIDS',
    descricao: 'SALGADINHOS',
    unidade: 'UNIDADE',
    deposito: 192,
    estoqueReal: 192,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'OK'
  },
  {
    id: 7,
    subcategoria: 'KIDS',
    descricao: 'BISCOITO OREO',
    unidade: 'UNIDADE',
    deposito: 6,
    estoqueReal: 6,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'ALERTA'
  },
  {
    id: 8,
    subcategoria: 'LIMPEZA',
    descricao: 'PAPEL TOALHA BOBINA',
    unidade: 'UNIDADE',
    deposito: 59,
    estoqueReal: 59,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'OK'
  },
  {
    id: 9,
    subcategoria: 'LIMPEZA',
    descricao: 'AGUA SANITARIA 5L',
    unidade: 'UNIDADE',
    deposito: 1,
    estoqueReal: 1,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'ALERTA'
  },
  {
    id: 10,
    subcategoria: 'ADMINISTRATIVO',
    descricao: 'RESMA DE PAPEL A4, C/ 500 FOLHAS',
    unidade: 'PACOTE',
    deposito: 35,
    estoqueReal: 35,
    mediaDiaria: 0.00,
    prazoPedido: 15,
    diasEstoque: '#DIV/0!',
    estoqueMinimo: 0.00,
    status: 'OK'
  }
];

export const useEstoque = () => {
  const [estoque, setEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Simular carregamento de dados
  const loadEstoque = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEstoque(mockEstoqueData);
      setLastUpdated(new Date());
      
      console.log(`${mockEstoqueData.length} itens carregados do estoque (dados de demonstração)`);
    } catch (err) {
      setError('Erro ao carregar dados do estoque: ' + err.message);
      console.error('Erro ao carregar estoque:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar item do estoque
  const updateItem = useCallback(async (itemId, updatedData) => {
    try {
      setError(null);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Atualizar estado local
      setEstoque(prev => prev.map(item => 
        item.id === itemId ? { ...item, ...updatedData } : item
      ));
      
      setLastUpdated(new Date());
      console.log(`Item ${itemId} atualizado com sucesso (simulação)`);
      return true;
    } catch (err) {
      setError('Erro ao atualizar item: ' + err.message);
      console.error('Erro ao atualizar item:', err);
      return false;
    }
  }, []);

  // Adicionar novo item
  const addItem = useCallback(async (newItem) => {
    try {
      setError(null);
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Criar novo item com ID único
      const newId = Math.max(...estoque.map(item => item.id)) + 1;
      const itemWithId = { ...newItem, id: newId };
      
      // Atualizar estado local
      setEstoque(prev => [...prev, itemWithId]);
      setLastUpdated(new Date());
      
      console.log('Novo item adicionado com sucesso (simulação)');
      return true;
    } catch (err) {
      setError('Erro ao adicionar item: ' + err.message);
      console.error('Erro ao adicionar item:', err);
      return false;
    }
  }, [estoque]);

  // Filtrar estoque por categoria
  const getByCategory = useCallback((categoria) => {
    return estoque.filter(item => 
      item.subcategoria.toLowerCase().includes(categoria.toLowerCase())
    );
  }, [estoque]);

  // Filtrar itens com status específico
  const getByStatus = useCallback((status) => {
    return estoque.filter(item => 
      item.status.toLowerCase() === status.toLowerCase()
    );
  }, [estoque]);

  // Buscar itens por descrição
  const searchItems = useCallback((searchTerm) => {
    if (!searchTerm) return estoque;
    
    return estoque.filter(item =>
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subcategoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [estoque]);

  // Estatísticas do estoque
  const getStats = useCallback(() => {
    const total = estoque.length;
    const alertas = estoque.filter(item => item.status === 'ALERTA').length;
    const pedidos = estoque.filter(item => item.status === 'REALIZAR PEDIDO').length;
    const ok = estoque.filter(item => item.status === 'OK').length;
    
    const categorias = [...new Set(estoque.map(item => item.subcategoria))];
    
    return {
      total,
      alertas,
      pedidos,
      ok,
      categorias: categorias.length,
      categoriasLista: categorias
    };
  }, [estoque]);

  // Carregar dados na inicialização
  useEffect(() => {
    loadEstoque();
  }, [loadEstoque]);

  return {
    estoque,
    loading,
    error,
    lastUpdated,
    loadEstoque,
    updateItem,
    addItem,
    getByCategory,
    getByStatus,
    searchItems,
    getStats
  };
};

