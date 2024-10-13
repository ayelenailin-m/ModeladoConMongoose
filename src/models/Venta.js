import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true,
    },
});

const Venta = mongoose.model('Venta', ventaSchema);

export default Venta;
