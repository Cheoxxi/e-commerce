import { Result } from './../../../../packages/product-db/prisma/generated/prisma/internal/prismaNamespace';
import {FastifyInstance} from 'fastify';
import { shouldBeAdmin, shouldBeUser } from '../middleware/authMiddleware';
import { Order } from '@repo/order-db';
import { startOfMonth, subMonths } from 'date-fns';
import { OrderChartType } from '@repo/types';

export const orderRoute = async (fastify: FastifyInstance) =>{
    fastify.get(
        '/user-orders',
        {preHandler: shouldBeUser},
         async (request, reply) => {
            const orders = await Order.find({userId: request.userId});
            return reply.send(orders);
        }

    );
     fastify.get('/orders', {preHandler: shouldBeAdmin},async (request, reply) => {
        const { limit } = request.query as { limit: number };
        const orders = await Order.find().limit(limit).sort({createdAt: -1});
        return reply.send(orders);
    });
    
    fastify.get('/order-chart', {preHandler: shouldBeAdmin},async (request, reply) => {
        const now = new Date()
        const sixMonthsAgo = startOfMonth(subMonths(now,5))

        // { month: "Tháng 4", total: 173000000, successful: 100000000 },

        const raw = await Order.aggregate([
            {
                $match:{
                    createdAt:{$gte:sixMonthsAgo, $lte:now}
                }
            },
            {
                $group:{
                    _id:{
                        year:{$year:"$createdAt"},
                        month:{$month:"$createdAt"},
                    },
                    total: {$sum:"$amount"},
                    successful:{
                        $sum:{
                            $cond:[{$eq:["$status","success"]},"$amount",0],
                            // {
                            //     "year":2026,
                            //     "month":9,
                            //     "total":100,
                            //     "successful":72
                            // }
                        }
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    year:"$_id.year",
                    month:"$_id.month",
                    total:1,
                    successful:1
                }
            },
            {
                $sort: {year:1, month:1},
            }
        ]);

        const monthNames = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ];
        const results: OrderChartType[]= []
        
        for (let i = 5; i >= 0; i--) {
            const d = subMonths(now, i);
            const year = d.getFullYear();
            const month = d.getMonth() + 1;

            const match = raw.find(
                (item) => item.year === year && item.month === month
            );

            results.push({
                month: monthNames[month - 1] as string,
                total: match ? match.total : 0,
                successful: match ? match.successful : 0,
            });
            }

            return reply.send(results);
    });
    
};