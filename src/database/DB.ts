import mongoose from 'mongoose';

class DB {
    private static instance: DB | null = null;
    private url: string;

    private constructor(url: string) {
        this.url = url;
    }

    public static getInstance(url: string): DB {
        if (!DB.instance) {
            DB.instance = new DB(url);
        }
        return DB.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.url);
            console.log('MongoDB connected');
        } catch (error) {
            // console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log('MongoDB disconnected');
        } catch (error) {
            // console.error('Error disconnecting from MongoDB:', error);
        }
    }
}

export default DB;
