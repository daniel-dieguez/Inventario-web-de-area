import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Inventario() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    marca: "",
    tipoEquipo: "",
    departamento: "",
    fechaAsignacion: "",
    personaResponsable: "",
    fechaIngreso: ""
  });
  const [updateId, setUpdateId] = useState("");



        // Obtener todos los productos
       const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5020/inventario/viewAll');
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
      
        // Agregar nuevo producto
        const addProduct = async () => {
          try {
            await axios.post('http://localhost:5020/inbentario/newProducto', newProduct);
            alert("Producto añadido con éxito");
            fetchProducts(); 
          } catch (error) {
            console.error("Error adding product: ", error);
          }
        };
      
        // Actualizar producto
        const updateProduct = async () => {
          try {
            await axios.put(`http://localhost:5020/inventario/updateProducto/${updateId}`, newProduct);
            alert("Producto actualizado con éxito");
            fetchProducts(); // Refresh product list after updating
          } catch (error) {
            console.error("Error updating product: ", error);
          }
        };
      
        // Eliminar producto
        const deleteProduct = async (id) => {
          try {
            await axios.delete(`http://localhost:5020/inventario/delete/${id}`);
            alert("Producto eliminado con éxito");
            fetchProducts(); // Refresca la lista de productos
          } catch (error) {
            console.error("Error deleting product: ", error.response?.data || error.message);
          }
        };
        
      
         // Handle input changes for new or updated product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Gestión de Inventario</h1>

      <h2>Llenar datos</h2>
      <h3>Si desea actualizar solo agregue el id abajo y coloque nuevamente los datos aqui</h3>
     
      <input type="text" name="marca" placeholder="Marca" value={newProduct.marca} onChange={handleInputChange} />
      <input type="text" name="tipoEquipo" placeholder="Tipo de Equipo" value={newProduct.tipoEquipo} onChange={handleInputChange} />
      <input type="text" name="departamento" placeholder="Departamento" value={newProduct.departamento} onChange={handleInputChange} />
      <input type="date" name="fechaAsignacion" placeholder="Fecha Asignación" value={newProduct.fechaAsignacion} onChange={handleInputChange} />
      <input type="text" name="personaResponsable" placeholder="Persona Responsable" value={newProduct.personaResponsable} onChange={handleInputChange} />
      <input type="date" name="fechaIngreso" placeholder="Fecha de Ingreso" value={newProduct.fechaIngreso} onChange={handleInputChange} />

      <h3>Si desea Agregar un nuevo producto llene los datos y dele click aqui </h3>
      <button onClick={addProduct}>Agregar Producto</button>
      
      <h2>Actualizar Producto</h2>
      <input type="text" placeholder="ID del Producto a Actualizar" value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
      <button onClick={updateProduct}>Actualizar Producto</button>

      <h2>Listado de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.codigoInventario}>
            ID: {product.codigoInventario} - Marca: {product.marca} - Tipo: {product.tipoEquipo} - Departamento: {product.departamento} - FechaAsignacion: {product.fechaAsignacion} - fecha ingreso: {product.fechaIngreso}
            <button onClick={() => deleteProduct(product.codigoInventario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
