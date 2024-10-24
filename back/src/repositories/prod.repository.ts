import { Repository } from "../shared/repository.js";
import { Producto } from "../models/prod.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class ProductoRepository implements Repository<Producto>{

    public async findAll(): Promise<Producto [] | undefined> {
        const [productos] = await pool.query('SELECT * FROM producto')
        return productos as Producto []
    }

    public async findOne(item: {id:string}): Promise<Producto | undefined>{
        const id = Number.parseInt(item.id)
        const [productos] = await pool.query<RowDataPacket[]>('SELECT * FROM producto where codigo = ?',
            [id])
        if(productos.length == 0){
            return undefined
        }
        const producto = productos[0] as Producto 
        return producto
    }

    public async add(item: Producto): Promise<Producto> {
        const [result] = (await pool.query<ResultSetHeader>('INSERT INTO producto (nombre, cantidad, descripcion, id_tipo_producto) VALUES (?, ?, ?)',
            [item.nombre, item.cantidad, item.descripcion, item.id_tipo_producto]
        )) as RowDataPacket[];
        const affectedRows = (result as any).affectedRows;
        if (affectedRows === 1) {
            return item;}
        else {
            throw new Error('No se pudo insertar el producto');
        }
    }

    public async update(item: { id: string}, producto:Producto): Promise<Producto | undefined> {
        const id = Number.parseInt(item.id)
        const [result] = (await pool.query(
            'UPDATE producto SET nombre = ?, cantidad = ?, descripcion = ?, id_tipo_producto = ? WHERE id = ?',
            [producto.nombre, producto.cantidad, producto.descripcion, producto.id_tipo_producto, id]
        )) as RowDataPacket[];
        const affectedRows = (result as any).affectedRows;
        if (affectedRows === 1) {
            return producto;
        } else {    
            throw new Error('No se pudo actualizar el producto');
        }
    }	

    public async remove(item: { id: string}): Promise<void> {
        const id = Number.parseInt(item.id);
        const [result] = (await pool.query('DELETE FROM producto WHERE id = ?', [id])) as RowDataPacket[];
        const affectedRows = (result as any).affectedRows;
        if (affectedRows === 0) {
            throw new Error('No se pudo eliminar el producto');
        }}
    

        public async findByStock(cantidad:number): Promise<Producto [] | undefined> {
            const [productos] = await pool.query('SELECT * FROM producto WHERE cantidad >= ?', [cantidad]);
            return productos as Producto [];
        }





}
    
