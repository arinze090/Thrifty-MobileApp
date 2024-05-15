import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  query Query {
    getCategories {
      createdAt
      id
      name
      subcategories {
        category
        createdAt
        id
        item_type {
          createdAt
          id
          items {
            id
            name
            size
            description
            color
            cover_image
            other_snapshots
            price
            min_offer
            quantity_in_stock
            brand {
              id
              name
              abbreviation
              description
              logo
              createdAt
            }
            condition {
              id
              name
              description
              createdAt
            }
            item_type
            owner {
              id
              slug
              firstname
              lastname
              email
              mobile
              country
              gender
              isVerified
              content_preference
              createdAt
              orders_as_seller {
                id
                items {
                  id
                  name
                  size
                  description
                  color
                  cover_image
                  other_snapshots
                  price
                  min_offer
                  quantity_in_stock
                  item_type
                  createdAt
                }
                total_price_paid
                price_breakdown {
                  total_items_price
                  platform_percentage
                  platform_fee
                  delivery_fee
                  total_accumulated_price
                }
                item_quantity {
                  item
                  qty
                }
                sellers
                price_used_breakdown
                is_sent_out
                is_delivered
                is_recieved
                is_accepted
                accepted_by
                is_rejected
                rejection_reason
                is_refunded
                refund_reason
                is_settled
                settlement_reason
                delivery_details {
                  street_address
                  apt_or_suite_number
                  state
                  city
                  additional_phone_number
                  special_instructions
                  zip_code
                }
                createdAt
              }
              orders_as_buyer {
                id
                total_price_paid
                sellers
                price_used_breakdown
                is_sent_out
                is_delivered
                is_recieved
                is_accepted
                accepted_by
                is_rejected
                rejection_reason
                is_refunded
                refund_reason
                is_settled
                settlement_reason
                createdAt
              }
              wallet {
                pending_balance
                available_balance
              }
            }
            createdAt
          }
          name
          subcategory
        }
        name
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  query VerifyToken {
    verifyToken {
      code
      exp
      iat
      id
    }
  }
`;

export const GET_BRANDS = gql`
  query Query {
    getBrands {
      abbreviation
      createdAt
      description
      id
      logo
      name
    }
  }
`;

export const GET_ITEM_CONDITIONS = gql`
  query Query {
    getItemConditions {
      createdAt
      description
      id
      name
    }
  }
`;

export const GET_ORDER_AS_BUYER = gql`
  query Query {
    getOrdersAsBuyer {
      code
      message
      success
      orders {
        id
        owner {
          id
          slug
          firstname
          lastname
          email
          mobile
          country
          face_id
          show_face_id
          fcm_token
          gender
          isVerified
          content_preference
          createdAt
          orders_as_seller {
            id
            total_price_paid
            sellers
            price_used_breakdown
            is_sent_out
            is_delivered
            is_recieved
            is_accepted
            accepted_by
            is_rejected
            rejection_reason
            is_refunded
            refund_reason
            is_settled
            settlement_reason
            createdAt
            item_quantity {
              item
              qty
            }
            delivery_details {
              street_address
              apt_or_suite_number
              state
              city
              additional_phone_number
              special_instructions
              zip_code
            }
            price_breakdown {
              delivery_fee
              platform_fee
              platform_percentage
              total_accumulated_price
              total_items_price
            }
            owner {
              country
              email
              firstname
              id
              lastname
              mobile
              slug
            }
          }
          orders_as_buyer {
            id
            total_price_paid
            sellers
            price_used_breakdown
            is_sent_out
            is_delivered
            is_recieved
            is_accepted
            accepted_by
            is_rejected
            rejection_reason
            is_refunded
            refund_reason
            is_settled
            settlement_reason
            createdAt
          }
          wallet {
            pending_balance
            available_balance
          }
        }
        items {
          id
          name
          size
          description
          color
          cover_image
          other_snapshots
          price
          min_offer
          quantity_in_stock
          brand {
            id
            name
            abbreviation
            description
            logo
            createdAt
          }
          condition {
            id
            name
            description
            createdAt
          }
          item_type
          createdAt
        }
        total_price_paid
        price_breakdown {
          total_items_price
          platform_percentage
          platform_fee
          delivery_fee
          total_accumulated_price
        }
        item_quantity {
          item
          qty
        }
        sellers
        price_used_breakdown
        is_sent_out
        is_delivered
        is_recieved
        is_accepted
        accepted_by
        is_rejected
        rejection_reason
        is_refunded
        refund_reason
        is_settled
        settlement_reason
        delivery_details {
          street_address
          apt_or_suite_number
          state
          city
          additional_phone_number
          special_instructions
          zip_code
        }
        createdAt
      }
    }
  }
`;

export const GET_ORDER_AS_SELLER = gql`
  query Query {
    getOrdersAsSeller {
      code
      message
      success
      orders {
        accepted_by
        createdAt
        id
        total_price_paid
        sellers
        price_used_breakdown
        is_sent_out
        is_delivered
        is_recieved
        is_accepted
        is_rejected
        rejection_reason
        is_refunded
        refund_reason
        is_settled
        settlement_reason
        delivery_details {
          street_address
          apt_or_suite_number
          state
          city
          additional_phone_number
          special_instructions
          zip_code
        }
        item_quantity {
          item
          qty
        }
        price_breakdown {
          delivery_fee
          platform_fee
          platform_percentage
          total_accumulated_price
          total_items_price
        }
        owner {
          country
          email
          firstname
          id
          gender
          lastname
          mobile
          slug
        }
        items {
          id
          name
          size
          description
          color
          cover_image
          other_snapshots
          price
          min_offer
          quantity_in_stock
          item_type
          createdAt
          condition {
            createdAt
            description
            id
            name
          }
          brand {
            abbreviation
            createdAt
            description
            id
            logo
            name
          }
          owner {
            country
            email
            gender
            id
            lastname
            firstname
            mobile
          }
        }
      }
    }
  }
`;

export const GET_TNX_HISTORY = gql`
  query Query {
    getTnxHistory {
      success
      message
      code
      history {
        amount
        available_balance
        date
        id
        owner
        order
        transaction
        type
        payment_method
        reference
        reference_type
        wallet_type
        status
        pending_balance
      }
    }
  }
`;

export const GET_USER_BALANCE = gql`
  query Query {
    getUserBalances {
      code
      message
      success
      wallet {
        pending_balance
        available_balance
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($inputData: RegisterInput) {
    registerUser(inputData: $inputData) {
      code
      message
      success
      userId
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String) {
    login(email: $email, password: $password) {
      code
      isVerified
      message
      success
      token
      userId
      user {
        content_preference
        country
        createdAt
        email
        face_id
        fcm_token
        firstname
        gender
        id
        isVerified
        lastname
        mobile
        show_face_id
        slug
        wallet {
          available_balance
          pending_balance
        }
        orders_as_buyer {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          items {
            id
            name
            size
            description
            color
            cover_image
            other_snapshots
            price
            min_offer
            quantity_in_stock
            brand {
              id
              name
              abbreviation
              description
              logo
              createdAt
            }
            condition {
              id
              name
              description
              createdAt
            }
            item_type
            createdAt
            owner {
              email
              country
              firstname
              lastname
              mobile
              slug
              id
              gender
            }
          }
          price_breakdown {
            delivery_fee
            platform_fee
            platform_percentage
            total_accumulated_price
            total_items_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          owner {
            email
            firstname
            gender
            id
            lastname
            mobile
            country
            slug
            createdAt
          }
        }
        orders_as_seller {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          price_breakdown {
            total_items_price
            platform_percentage
            platform_fee
            delivery_fee
            total_accumulated_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          items {
            brand {
              abbreviation
              createdAt
              description
              id
              logo
              name
            }
            color
            condition {
              createdAt
              description
              id
              name
            }
            cover_image
            createdAt
            description
            id
            item_type
            min_offer
            name
            other_snapshots
            owner {
              country
              email
              firstname
              gender
              id
              lastname
              mobile
              slug
            }
            price
            quantity_in_stock
            size
          }
          owner {
            country
            email
            firstname
            gender
            id
            lastname
            mobile
            slug
          }
        }
      }
    }
  }
`;

export const REQUEST_USER_VERIFICATION = gql`
  mutation Mutation($userId: ID!) {
    requestUserVerification(userId: $userId) {
      code
      isVerified
      message
      success
      token
      userId
      user {
        content_preference
        country
        createdAt
        email
        face_id
        fcm_token
        firstname
        gender
        id
        isVerified
        lastname
        mobile
        show_face_id
        slug
        wallet {
          available_balance
          pending_balance
        }
        orders_as_buyer {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          items {
            id
            name
            size
            description
            color
            cover_image
            other_snapshots
            price
            min_offer
            quantity_in_stock
            brand {
              id
              name
              abbreviation
              description
              logo
              createdAt
            }
            condition {
              id
              name
              description
              createdAt
            }
            item_type
            createdAt
            owner {
              email
              country
              firstname
              lastname
              mobile
              slug
              id
              gender
            }
          }
          price_breakdown {
            delivery_fee
            platform_fee
            platform_percentage
            total_accumulated_price
            total_items_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          owner {
            email
            firstname
            gender
            id
            lastname
            mobile
            country
            slug
            createdAt
          }
        }
        orders_as_seller {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          price_breakdown {
            total_items_price
            platform_percentage
            platform_fee
            delivery_fee
            total_accumulated_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          items {
            brand {
              abbreviation
              createdAt
              description
              id
              logo
              name
            }
            color
            condition {
              createdAt
              description
              id
              name
            }
            cover_image
            createdAt
            description
            id
            item_type
            min_offer
            name
            other_snapshots
            owner {
              country
              email
              firstname
              gender
              id
              lastname
              mobile
              slug
            }
            price
            quantity_in_stock
            size
          }
          owner {
            country
            email
            firstname
            gender
            id
            lastname
            mobile
            slug
          }
        }
      }
    }
  }
`;

export const USER_VERIFICATION = gql`
  mutation Mutation($userId: ID!, $verificationCode: String!) {
    userVerification(userId: $userId, verificationCode: $verificationCode) {
      code
      isVerified
      message
      success
      token
      userId
      user {
        content_preference
        country
        createdAt
        email
        face_id
        fcm_token
        firstname
        gender
        id
        isVerified
        lastname
        mobile
        show_face_id
        slug
        wallet {
          available_balance
          pending_balance
        }
        orders_as_buyer {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          items {
            id
            name
            size
            description
            color
            cover_image
            other_snapshots
            price
            min_offer
            quantity_in_stock
            brand {
              id
              name
              abbreviation
              description
              logo
              createdAt
            }
            condition {
              id
              name
              description
              createdAt
            }
            item_type
            createdAt
            owner {
              email
              country
              firstname
              lastname
              mobile
              slug
              id
              gender
            }
          }
          price_breakdown {
            delivery_fee
            platform_fee
            platform_percentage
            total_accumulated_price
            total_items_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          owner {
            email
            firstname
            gender
            id
            lastname
            mobile
            country
            slug
            createdAt
          }
        }
        orders_as_seller {
          accepted_by
          createdAt
          delivery_details {
            street_address
            apt_or_suite_number
            state
            city
            additional_phone_number
            special_instructions
            zip_code
          }
          id
          is_accepted
          is_delivered
          is_recieved
          is_refunded
          is_rejected
          is_sent_out
          is_settled
          item_quantity {
            item
            qty
          }
          price_breakdown {
            total_items_price
            platform_percentage
            platform_fee
            delivery_fee
            total_accumulated_price
          }
          price_used_breakdown
          refund_reason
          rejection_reason
          sellers
          settlement_reason
          total_price_paid
          items {
            brand {
              abbreviation
              createdAt
              description
              id
              logo
              name
            }
            color
            condition {
              createdAt
              description
              id
              name
            }
            cover_image
            createdAt
            description
            id
            item_type
            min_offer
            name
            other_snapshots
            owner {
              country
              email
              firstname
              gender
              id
              lastname
              mobile
              slug
            }
            price
            quantity_in_stock
            size
          }
          owner {
            country
            email
            firstname
            gender
            id
            lastname
            mobile
            slug
          }
        }
      }
    }
  }
`;

export const RESETPASSWORD = gql`
  mutation Mutation($resetData: ResetPasswordInput!) {
    resetPassword(resetData: $resetData) {
      code
      message
      success
    }
  }
`;

export const FORGETPASSWORD = gql`
  mutation Mutation($email: String!) {
    forgetPassword(email: $email) {
      code
      message
      success
      userId
    }
  }
`;

export const VERIFYRESETCODE = gql`
  mutation Mutation($resetCode: String!, $userId: ID!) {
    resetPasswordVerification(resetCode: $resetCode, userId: $userId) {
      code
      message
      success
    }
  }
`;

export const ADD_ITEM = gql`
  mutation Mutation($inputData: AddItemInput) {
    addItem(inputData: $inputData) {
      code
      message
      success
      item {
        brand {
          id
          name
          abbreviation
          description
          logo
          createdAt
        }
        color
        condition {
          id
          name
          description
          createdAt
        }
        cover_image
        createdAt
        description
        id
        item_type
        min_offer
        name
        other_snapshots
        owner {
          email
          firstname
          gender
          id
          lastname
          mobile
          country
          createdAt
          slug
        }
        price
        quantity_in_stock
        size
      }
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation Mutation($inputData: AddBrandInput!) {
    createBrand(inputData: $inputData) {
      brand {
        abbreviation
        id
        name
        description
        logo
        createdAt
      }
      code
      message
      success
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation Mutation($name: String!) {
    createCategory(name: $name) {
      category {
        createdAt
        id
        name
        subcategories {
          category
          createdAt
          id
          item_type {
            createdAt
            id
            name
            subcategory
            items {
              id
              name
              size
              description
              color
              cover_image
              other_snapshots
              price
              min_offer
              quantity_in_stock
              item_type
              createdAt
              condition {
                createdAt
                description
                id
                name
              }
              brand {
                abbreviation
                createdAt
                description
                id
                logo
                name
              }
              owner {
                country
                email
                firstname
                id
                gender
                lastname
                mobile
                slug
              }
            }
          }
          name
        }
      }
      code
      message
      success
    }
  }
`;

export const CREATE_ITEM_CONDITION = gql`
  mutation Mutation($name: String!, $description: String) {
    createItemCondition(name: $name, description: $description) {
      code
      itemCondition {
        createdAt
        description
        id
        name
      }
      message
      success
    }
  }
`;

export const CREATE_ITEM_TYPE = gql`
  mutation Mutation($inputData: ItemTypeInput!) {
    createItemType(inputData: $inputData) {
      code
      message
      success
      itemType {
        createdAt
        id
        name
        subcategory
        items {
          id
          name
          size
          description
          color
          cover_image
          other_snapshots
          price
          min_offer
          quantity_in_stock
          item_type
          createdAt
          condition {
            id
            name
            description
            createdAt
          }
          brand {
            id
            name
            abbreviation
            description
            logo
            createdAt
          }
          owner {
            country
            email
            firstname
            id
            gender
            lastname
            mobile
          }
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation Mutation($inputData: CreateOrderInput!) {
    createOrder(inputData: $inputData) {
      code
      message
      success
      order {
        id
        total_price_paid
        sellers
        price_used_breakdown
        is_sent_out
        is_delivered
        is_recieved
        is_accepted
        accepted_by
        is_rejected
        rejection_reason
        is_refunded
        refund_reason
        is_settled
        settlement_reason
        createdAt
        delivery_details {
          street_address
          apt_or_suite_number
          state
          city
          additional_phone_number
          special_instructions
          zip_code
        }
        price_breakdown {
          total_items_price
          platform_percentage
          platform_fee
          delivery_fee
          total_accumulated_price
        }
        item_quantity {
          item
          qty
        }
        owner {
          country
          email
          firstname
          gender
          id
          lastname
          mobile
          slug
        }
        items {
          id
          name
          size
          description
          color
          cover_image
          other_snapshots
          price
          min_offer
          quantity_in_stock
          item_type
          createdAt
          condition {
            createdAt
            description
            id
            name
          }
          brand {
            id
            name
            abbreviation
            description
            logo
            createdAt
          }
          owner {
            email
            firstname
            gender
            id
            lastname
            mobile
          }
        }
      }
    }
  }
`;

export const CREATE_SINGLE_ORDER = gql`
  mutation Mutation($inputData: CreateSingleOrderInput!) {
    createSingleOrder(inputData: $inputData) {
      code
      message
      success
      order {
        id
        total_price_paid
        sellers
        price_used_breakdown
        is_sent_out
        is_delivered
        is_recieved
        is_accepted
        accepted_by
        is_rejected
        rejection_reason
        is_refunded
        refund_reason
        is_settled
        settlement_reason
        createdAt
        delivery_details {
          street_address
          apt_or_suite_number
          state
          city
          additional_phone_number
          special_instructions
          zip_code
        }
        price_breakdown {
          total_items_price
          platform_percentage
          platform_fee
          delivery_fee
          total_accumulated_price
        }
        item_quantity {
          item
          qty
        }
        owner {
          country
          email
          firstname
          gender
          id
          lastname
          mobile
          slug
        }
        items {
          id
          name
          size
          description
          color
          cover_image
          other_snapshots
          price
          min_offer
          quantity_in_stock
          item_type
          createdAt
          condition {
            createdAt
            description
            id
            name
          }
          brand {
            id
            name
            abbreviation
            description
            logo
            createdAt
          }
          owner {
            email
            firstname
            gender
            id
            lastname
            mobile
          }
        }
      }
    }
  }
`;

export const CREATE_SUBCATEGORY = gql`
  mutation Mutation($name: String!, $categoryId: ID!) {
    createSubCategory(name: $name, categoryId: $categoryId) {
      code
      message
      success
      subCategory {
        category
        createdAt
        id
        item_type {
          id
          name
          subcategory
          createdAt
          items {
            id
            name
            size
            description
            color
            cover_image
            other_snapshots
            price
            min_offer
            quantity_in_stock
            item_type
            createdAt
            condition {
              id
              name
              description
              createdAt
            }
            brand {
              id
              name
              abbreviation
              description
              logo
              createdAt
            }
            owner {
              email
              country
              createdAt
              firstname
              gender
              id
              lastname
              mobile
            }
          }
        }
        name
      }
    }
  }
`;

export const UPDATE_TRACKING_PROGRESS = gql`
  mutation Mutation($orderId: ID!, $trackingLevel: Int!) {
    updateTrackingProgress(orderId: $orderId, trackingLevel: $trackingLevel) {
      code
      message
      success
      order {
        id
        is_accepted
        is_delivered
        is_recieved
        is_refunded
        is_rejected
        is_sent_out
        is_settled
        item_quantity {
          item
          qty
        }
        owner {
          id
          email
          country
          mobile
          lastname
          isVerified
          firstname
          gender
        }
        price_breakdown {
          delivery_fee
          platform_fee
          platform_percentage
          total_accumulated_price
          total_items_price
        }
        price_used_breakdown
        refund_reason
        rejection_reason
        settlement_reason
        total_price_paid
        delivery_details {
          additional_phone_number
          apt_or_suite_number
          city
          special_instructions
          state
          street_address
          zip_code
        }
        createdAt
        accepted_by
        sellers
        items {
          color
          condition {
            createdAt
            description
            id
            name
          }
          cover_image
          createdAt
          description
          id
          item_type
          min_offer
          name
          other_snapshots
          price
          quantity_in_stock
          size
          brand {
            abbreviation
            createdAt
            description
            id
            logo
            name
          }
        }
      }
    }
  }
`;
