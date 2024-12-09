const Joi = require('joi');

// Register validation schema
const registerSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': ' Full name should be at least 3 characters',
            'string.max': ' Full name cannot exceed 50 characters',
            'any.required': ' Please provide your full name'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': ' Please enter a valid email address',
            'any.required': ' Email address is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.min': ' Password must be at least 8 characters',
            'string.max': ' Password cannot exceed 30 characters',
            'string.pattern.base': ' Password requirements:\n• At least one uppercase letter\n• At least one lowercase letter\n• At least one number\n• At least one special character (@$!%*?&)',
            'any.required': ' Password is required'
        })
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': ' Please enter a valid email address',
            'any.required': ' Email address is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.min': ' Password must be at least 8 characters',
            'string.max': ' Password cannot exceed 30 characters',
            'string.pattern.base': ' Password requirements:\n• At least one uppercase letter\n• At least one lowercase letter\n• At least one number\n• At least one special character (@$!%*?&)',
            'any.required': ' Password is required'
        })
});

// Validation middleware
exports.validateRegister = (req, res, next) => {
    console.log('Validating registration request:', req.body);
    
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        console.error('Validation error:', error.details);
        const errors = error.details.map(detail => ({
            field: detail.context.key,
            message: detail.message.replace(/['"]/g, '')
        }));
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    next();
};

exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        console.error('Login validation error:', error.details);
        const errors = error.details.map(detail => ({
            field: detail.context.key,
            message: detail.message.replace(/['"]/g, '')
        }));
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    next();
};