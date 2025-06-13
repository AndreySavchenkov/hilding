"use client";

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserRole } from '@prisma/client';

export function useUserRole() {
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error('useUserRole must be used within a UserProvider');
  }

  const { user } = userContext;

  return {
    role: user?.role,
    isAdmin: user?.role === UserRole.ADMIN,
    isWorker: user?.role === UserRole.WORKER,
    isDriver: user?.role === UserRole.DRIVER,
  };
}