export default function Admin() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Панель администратора
      </h1>
      <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 text-gray-200 border-b border-gray-700 pb-4">
          Заказы
        </h2>
        <div className="space-y-6">
          {/* Здесь будет таблица или список заказов */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-center">
              Данные заказов будут отображаться здесь
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
