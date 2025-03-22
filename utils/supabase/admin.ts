import { createClient } from "@supabase/supabase-js"
import type { Database, Tables, TablesInsert } from '@/types/database.types';

export function createAdminClient() {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    return supabase
}

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// =========================================
// MOCK IMPLEMENTATIONS OF STRIPE FUNCTIONS
// These functions no longer interact with Stripe
// but are kept as no-ops for compatibility
// =========================================

// Mock implementation - no longer interacts with Stripe
export const upsertProductRecord = async (product: any) => {
    console.log('MOCK: Product insert/update called but Stripe is disabled');
    return;
};

// Mock implementation - no longer interacts with Stripe
export const upsertPriceRecord = async (price: any) => {
    console.log('MOCK: Price insert/update called but Stripe is disabled');
    return;
};

// Mock implementation - no longer interacts with Stripe
export const deleteProductRecord = async (product: any) => {
    console.log('MOCK: Product deletion called but Stripe is disabled');
    return;
};

// Mock implementation - no longer interacts with Stripe
export const deletePriceRecord = async (price: any) => {
    console.log('MOCK: Price deletion called but Stripe is disabled');
    return;
};

// Mock implementation - no longer interacts with Stripe
export const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    console.log('MOCK: Subscription status change called but Stripe is disabled');
    return;
};
