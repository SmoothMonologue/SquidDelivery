class OrderController {}

async (req, res) => {
  const userId = req.user;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: +userId },
    });
    if (!cart) {
      return res.status(404).json({ message: '장바구니를 찾을 수 없습니다.' });
    }

    const priceSum = cart.menuInfo.price.reduce((prev, current) => prev + current, 0); //장바구니 가격 합계
    const menuNames = cart.menuInfo.name; // 장바구니에서 메뉴 이름 배열 가져오기
    const menuName = menuNames.join(', '); // 배열을 문자열로 변환

    const order = await prisma.$transaction(async (tx) => {
      //결제api

      return await tx.order.create({
        data: {
          userId: +userId,
          cartId: cart.id,
          priceSum: priceSum,
          status: '주문 요청',
          menuName: menuName,
        },
      });
    });
    return res.status(201).json({ message: '메뉴를 주문했습니다.', order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: '주문 처리 중 오류가 발생했습니다.' });
  }
};
