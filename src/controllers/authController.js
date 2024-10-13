import Empleado from "../models/Empleado";
import jwt from 'jsonwebtoken';

export const registerEmpleado = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const empleadoExiste = await Empleado.findOne({ email });

        if (empleadoExiste) {
            return res.status(400).json({ message: 'El empleado ya existe' });
        }

        const empleado = new Empleado({ nombre, email, password });
        await empleado.save();

        const token = jwt.sign({ id: empleado._id }, 'secretKey', { expiresIn: '1h' });

        res.json({
            _id: empleado._id,
            nombre: empleado.nombre,
            email: empleado.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar empleado' });
    }
};
