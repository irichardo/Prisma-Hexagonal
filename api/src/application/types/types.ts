import type { Router } from 'express'

export interface RouteStructure {
  path: string
  router: Router
}

export enum RouteVersion {
  'v1' = 'v1',
  'v2' = 'v2'
}

export type IRoutes = Record<RouteVersion, RouteStructure[]>
