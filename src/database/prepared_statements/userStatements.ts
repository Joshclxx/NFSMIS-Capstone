export const USER_PREPARED_STATEMENTS = {
  getUserByEmail: {
    name: "get_user_by_email",
    text: `
        SELECT 
            u.id AS userId,
            COALESCE(CONCAT_WS(' ', u.first_name, NULLIF(u.middle_name, ''), u.last_name, NULLIF(u.suffix, '')), 'not-set') AS fullName,
            COALESCE(TO_CHAR(u.dob, 'YYYY-MM-DD'), 'not-set') AS birthday,
            COALESCE(u.sex::text, 'not-set') AS sex,
            COALESCE(u.contact_no, 'not-set') AS phone,
            COALESCE(a.email, 'not-set') AS email,
            COALESCE(NULLIF(CONCAT_WS(' ', NULLIF(ad.unit_no, ''), NULLIF(ad.building, ''), NULLIF(ad.house_no, ''), ad.street, ad.brgy, ad.city, ad.region), ''), 'not-set') AS address,
            COALESCE(NULLIF(CONCAT_WS(' ', ec.first_name, ec.last_name), ''), 'not-set') AS emergencyName,
            COALESCE(ec.contact_no, 'not-set') AS emergencyPhone,
            COALESCE(r.name, 'not-set') AS role
        FROM auth.users u 
        LEFT JOIN auth.accounts a
        ON u.id = a.user_id 
        LEFT JOIN auth.emergency_contacts ec 
        ON u.id = ec.user_id 
        LEFT JOIN auth.user_roles ur 
        ON u.id = ur.user_id 
        LEFT JOIN auth.addresses ad
        ON u.id = ad.user_id  
        LEFT JOIN auth.roles r 
        ON ur.role_id = r.id 
        WHERE a.email = $1;
        `,
    },
} as const;
