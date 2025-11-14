import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { type?: string; eventType?: string; district?: string }) {
    return this.prisma.actionLocation.findMany({
      where: {
        isActive: true,
        ...filters,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const location = await this.prisma.actionLocation.findUnique({
      where: { id },
    });

    if (location) {
      // Increment views
      await this.prisma.actionLocation.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    }

    return location;
  }

  async findByCoordinates(lat: number, lng: number, radius: number = 5) {
    // Simple radius search (for production, use PostGIS for accurate distance)
    return this.prisma.actionLocation.findMany({
      where: {
        isActive: true,
        latitude: {
          gte: lat - radius / 111, // Approximate km to degrees
          lte: lat + radius / 111,
        },
        longitude: {
          gte: lng - radius / 111,
          lte: lng + radius / 111,
        },
      },
    });
  }
}

