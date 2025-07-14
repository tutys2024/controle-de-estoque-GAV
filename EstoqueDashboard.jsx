import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const COLORS = {
  'OK': '#22c55e',
  'ALERTA': '#f59e0b',
  'REALIZAR PEDIDO': '#ef4444'
};

const EstoqueDashboard = ({ estoque, stats }) => {
  // Dados para gráfico de status
  const statusData = [
    { name: 'OK', value: stats.ok, color: COLORS.OK },
    { name: 'Alerta', value: stats.alertas, color: COLORS.ALERTA },
    { name: 'Realizar Pedido', value: stats.pedidos, color: COLORS['REALIZAR PEDIDO'] }
  ].filter(item => item.value > 0);

  // Dados para gráfico de categorias
  const categoryData = stats.categoriasLista.map(categoria => {
    const items = estoque.filter(item => item.subcategoria === categoria);
    const alertas = items.filter(item => item.status === 'ALERTA').length;
    const pedidos = items.filter(item => item.status === 'REALIZAR PEDIDO').length;
    const ok = items.filter(item => item.status === 'OK').length;
    
    return {
      categoria,
      total: items.length,
      ok,
      alertas,
      pedidos
    };
  }).sort((a, b) => b.total - a.total);

  // Itens críticos (que precisam de pedido)
  const itensCriticos = estoque.filter(item => item.status === 'REALIZAR PEDIDO');
  
  // Itens em alerta
  const itensAlerta = estoque.filter(item => item.status === 'ALERTA');

  return (
    <div className=\"space-y-6\">
      {/* Gráficos */}
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">
        {/* Gráfico de Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Estoque</CardTitle>
            <CardDescription>Distribuição por status dos itens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className=\"h-64\">
              <ResponsiveContainer width=\"100%\" height=\"100%\">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx=\"50%\"
                    cy=\"50%\"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill=\"#8884d8\"
                    dataKey=\"value\"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Itens por Categoria</CardTitle>
            <CardDescription>Quantidade de itens em cada categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className=\"h-64\">
              <ResponsiveContainer width=\"100%\" height=\"100%\">
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray=\"3 3\" />
                  <XAxis 
                    dataKey=\"categoria\" 
                    angle={-45}
                    textAnchor=\"end\"
                    height={60}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey=\"ok\" stackId=\"a\" fill={COLORS.OK} name=\"OK\" />
                  <Bar dataKey=\"alertas\" stackId=\"a\" fill={COLORS.ALERTA} name=\"Alerta\" />
                  <Bar dataKey=\"pedidos\" stackId=\"a\" fill={COLORS['REALIZAR PEDIDO']} name=\"Realizar Pedido\" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listas de Itens Críticos */}
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">
        {/* Itens que precisam de pedido */}
        <Card>
          <CardHeader>
            <CardTitle className=\"flex items-center justify-between\">
              Itens Críticos
              <Badge variant=\"destructive\">{itensCriticos.length}</Badge>
            </CardTitle>
            <CardDescription>Itens que precisam de reposição urgente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className=\"space-y-3 max-h-64 overflow-y-auto\">
              {itensCriticos.length === 0 ? (
                <p className=\"text-sm text-gray-500 text-center py-4\">
                  Nenhum item crítico no momento
                </p>
              ) : (
                itensCriticos.map((item) => (
                  <div key={item.id} className=\"flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200\">
                    <div>
                      <p className=\"font-medium text-sm\">{item.descricao}</p>
                      <p className=\"text-xs text-gray-600\">{item.subcategoria}</p>
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-sm font-bold text-red-600\">{item.estoqueReal}</p>
                      <p className=\"text-xs text-gray-500\">{item.unidade}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Itens em alerta */}
        <Card>
          <CardHeader>
            <CardTitle className=\"flex items-center justify-between\">
              Itens em Alerta
              <Badge variant=\"secondary\" className=\"bg-yellow-100 text-yellow-800\">{itensAlerta.length}</Badge>
            </CardTitle>
            <CardDescription>Itens com estoque baixo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className=\"space-y-3 max-h-64 overflow-y-auto\">
              {itensAlerta.length === 0 ? (
                <p className=\"text-sm text-gray-500 text-center py-4\">
                  Nenhum item em alerta no momento
                </p>
              ) : (
                itensAlerta.map((item) => (
                  <div key={item.id} className=\"flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200\">
                    <div>
                      <p className=\"font-medium text-sm\">{item.descricao}</p>
                      <p className=\"text-xs text-gray-600\">{item.subcategoria}</p>
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-sm font-bold text-yellow-600\">{item.estoqueReal}</p>
                      <p className=\"text-xs text-gray-500\">{item.unidade}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo por Categoria</CardTitle>
          <CardDescription>Visão geral do status de cada categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4\">
            {categoryData.map((categoria) => (
              <div key={categoria.categoria} className=\"p-4 border rounded-lg bg-white\">
                <h4 className=\"font-semibold text-sm mb-2\">{categoria.categoria}</h4>
                <div className=\"space-y-1\">
                  <div className=\"flex justify-between text-xs\">
                    <span>Total:</span>
                    <span className=\"font-medium\">{categoria.total}</span>
                  </div>
                  <div className=\"flex justify-between text-xs\">
                    <span className=\"text-green-600\">OK:</span>
                    <span className=\"font-medium text-green-600\">{categoria.ok}</span>
                  </div>
                  <div className=\"flex justify-between text-xs\">
                    <span className=\"text-yellow-600\">Alerta:</span>
                    <span className=\"font-medium text-yellow-600\">{categoria.alertas}</span>
                  </div>
                  <div className=\"flex justify-between text-xs\">
                    <span className=\"text-red-600\">Pedido:</span>
                    <span className=\"font-medium text-red-600\">{categoria.pedidos}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoqueDashboard;

